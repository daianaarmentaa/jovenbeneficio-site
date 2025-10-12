# crear_hash.py
import bcrypt
password_en_texto_plano = "hashed_password_123" 
bytes_de_password = password_en_texto_plano.encode('utf-8')
salt = bcrypt.gensalt()
hash_final = bcrypt.hashpw(bytes_de_password, salt)
print(hash_final.decode('utf-8'))