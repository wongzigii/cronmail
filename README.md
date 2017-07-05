# cronmail

A cron job to send daily report of database to your mailbox.

## Usage

    node app.js [-options]
    
## Options

TBD

## Configuration

You will need to create a config file named `config.json` likes this:
````javascript
{
  "toUser": ["YOUR_MAIL_ONE@gmail.com", "YOUR_MAIL_TWO@gmail.com"],
  "smtpserver": {
    "port": 465,
    "host": "smtp.gmail.com",
    "nickname": "YOUR_NAME",
    "user": "YOUR_MAIL_ADDRESS",
    "userpass": "YOUR_MAIL_USERPASS"
  },

  "sqlserver": {
    "host": "YOUR_SQLSERVER_ADDRESS",
    "user": "YOUR_SQLSERVER_USER",
    "password": "YOUR_SQLSERVER_USERPASS"
  }
}
````
