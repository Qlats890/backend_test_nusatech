# Test backend :

1.  relational database (user profile)
    1. data user berisi  : id user, email, password (encrypted),status(pending,registered,verified)
    2. data wallet/balance user (1 id_user ≥0 id_wallet ≤ total id_currency) berisi :id_wallet,  id_currency, id_user, amount
    3. data currency (1 id_balance = 1 id_currency):
    4. data pin /mailer (id_user ≥1): id_verifikasi, email,pin,status(pending,registered,verified,expired)
2.  konsep cronjob mailer (api)
    1. setiap 10 detik ngecek user yang pending untuk dikirimi verifikasi register /pin 
    2. setelah mengirim email maka status user dan status pin berubah menjadi registered 
    3. setelah  verifikasi pin maka status user dan status pin berubah menjadi verified
    4. pin expired jika tidak di verifikasi lebih dari 1jam
    

API yang harus di siapkan :

1. post signup 
2. post signin
3. get userdata (email, balance ,status dll.)
4. put user email (ganti email yang saat ini dipakai) ⇒ verifikasi email lama dulu ⇒kemudian verifikasi email baru