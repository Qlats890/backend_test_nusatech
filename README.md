# Test backend :

1.  relational database (user profile)
    1. data user berisi : id user, email, password (encrypted),status(pending,registered,verified)
    2. data wallet/balance user (1 id_user ≥0 id_wallet ≤ total id_currency) berisi :id_wallet, id_currency, id_user, amount
    3. data currency (1 id_balance = 1 id_currency):
    4. data pin /mailer (id_user ≥1): id_verifikasi, email,pin,status(pending,registered,verified,expired)
2.  konsep cronjob mailer (api)
    1. setiap 10 detik ngecek user yang pending untuk dikirimi verifikasi register /pin
    2. setelah mengirim email maka status user dan status pin berubah menjadi registered
    3. setelah verifikasi pin maka status user dan status pin berubah menjadi verified
    4. pin expired jika tidak di verifikasi lebih dari 1jam

API yang harus di siapkan :

1. post signup
2. post signin
3. get userdata (email, balance ,status dll.)
4. put user email (ganti email yang saat ini dipakai) ⇒ verifikasi email lama dulu ⇒kemudian verifikasi email baru

## How to Use ?

1. Create the database
2. Run this script:

```
npm install
```

3. Ready to go ^^

## API Information

#### For SignUp

```http
  POST http://localhost:PORT/v1/signup
```

| Body    | Type     | Description  |
| :------ | :------- | :----------- |
| `email` | `string` | **Required** |
| `pass`  | `string` | **Required** |

#### For Verify SignUp

```http
  get http://localhost:PORT/v1/verify/:pin
```

| Parameter | Type     | Description  |
| :-------- | :------- | :----------- |
| `pin`     | `string` | **Required** |

#### For SignIn

```http
  POST http://localhost:PORT/v1/signin
```

| Body    | Type     | Description  |
| :------ | :------- | :----------- |
| `email` | `string` | **Required** |
| `pass`  | `string` | **Required** |

#### For Get Userdata

```http
  GET http://localhost:PORT/v1/userdata
```

| Headers | Type     | Description  |
| :------ | :------- | :----------- |
| `Token` | `string` | **Required** |

#### For Get Send Notif To Change Email

```http
  GET http://localhost:PORT/v1/send-notif-change-email
```

| Headers | Type     | Description  |
| :------ | :------- | :----------- |
| `token` | `string` | **Required** |
| Body    | Type     | Description  |
| :------ | :------- | :----------- |
| `email` | `string` | **Required** |
| `pass`  | `string` | **Required** |

```http
  GET http://localhost:PORT/v1/change-email
```

| Headers   | Type     | Description  |
| :-------- | :------- | :----------- |
| `token`   | `string` | **Required** |
| Body      | Type     | Description  |
| :------   | :------- | :----------- |
| `email`   | `string` | **Required** |
| `newEmai` | `string` | **Required** |

## ENV

PORT = port_express <br>
HOST_PG = localhost <br>
DB_NAME = nusatech (menyesuaikan) <br>
DB_USER = postgres (menyesuaikan) <br>
DB_PASS = root (menyesuaikan) <br>
DB_PORT = 5432 (menyesuaikan) <br>
AUTH_EMAIL = bambangmahardhika1403@gmail.com (menyesuaikan) <br>
AUTH_PASS = mtyhxkmrunywfivf (menyeseuaikan) <br>
SECRET_KEY_TOKEN = trial_nusatech (menyesuaikan) <br>
SALT_BCRYPT = 10 (menyesuaikan) <br>
