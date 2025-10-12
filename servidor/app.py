import os
from dotenv import load_dotenv
import bcrypt
import mysql.connector
import firebase_admin
from firebase_admin import credentials, auth
from flask import Flask, request, jsonify
from flask_cors import CORS

load_dotenv()

# --- Configuración ---

# Inicializa la app de Flask
app = Flask(__name__)

# Permite que tu app de Next.js (ej. localhost:3000) se comunique con este backend
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

# Carga las credenciales de Firebase
cred = credentials.Certificate("serviceAccountKey.json")
firebase_admin.initialize_app(cred)

# --- Conexión a la Base de Datos ---
def get_db_connection():
    # ¡IMPORTANTE! Usa variables de entorno para tus credenciales de BD en un proyecto real
    return mysql.connector.connect(
        host=os.getenv("DB_HOST"),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD"),
        database=os.getenv("DB_NAME")
    )

@app.route('/test-db')
def test_db_connection():
    try:
        db = get_db_connection()
        if db.is_connected():
            db.close()
            return jsonify({"message": "✅ ¡Conexión a la base de datos exitosa!"}), 200
        else:
            return jsonify({"message": "❌ No se pudo conectar a la base de datos."}), 500
    except mysql.connector.Error as err:
        # Devuelve el error específico de MySQL para un mejor diagnóstico
        return jsonify({"error": f"Error de MySQL: {err}"}), 500
    except Exception as e:
        return jsonify({"error": f"Ocurrió un error inesperado: {e}"}), 50

# --- Endpoint de Login ---
@app.route('/api/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        if not data or not data.get('email') or not data.get('password'):
            return jsonify({"error": "Email y contraseña son requeridos"}), 400

        email = data['email']
        password = data['password']

        db = get_db_connection()
        cursor = db.cursor(dictionary=True)

        # 1. Busca al usuario en tu base de datos MySQL
        cursor.execute("SELECT id_admin, contrasenia FROM Administrador WHERE correo = %s", (email,))
        user_record = cursor.fetchone()
        print(f"REGISTRO OBTENIDO DE LA BD: {user_record}")
        cursor.close()
        db.close()

        if not user_record:
            return jsonify({"error": "Usuario o contraseña incorrectos"}), 404

        # 2. Verifica la contraseña hasheada con bcrypt
        stored_hash = user_record['contrasenia'].encode('utf-8')
        is_password_correct = bcrypt.checkpw(password.encode('utf-8'), stored_hash)

        if not is_password_correct:
            return jsonify({"error": "Usuario o contraseña incorrectos"}), 401

        # 3. Si es correcta, crea el token personalizado de Firebase
        uid = str(user_record['id_admin'])
        custom_token = auth.create_custom_token(uid)

        # 4. Devuelve el token al frontend
        return jsonify({"token": custom_token.decode('utf-8')}), 200

    except Exception as e:
        print(f"Error detallado: {e}")
        return jsonify({"error": str(e)}), 500

# --- Ejecución del servidor ---
if __name__ == '__main__':
    # Corre la app en el puerto 5000 por defecto
    app.run(debug=True)