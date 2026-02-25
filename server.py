from flask import Flask, render_template, request
import re

app = Flask(__name__)

@app.route("/")
def main():
    user_agent = str(request.user_agent)
    # Simple regex check for 'Mobile' in user agent string
    is_mobile = re.search("Mobile", user_agent) is not None

    if (is_mobile):
        return render_template("mobile.html")
    else:
        return render_template("index.html")


if __name__ == "__main__":
    app.run(port = 4000, host='0.0.0.0', debug=True)
