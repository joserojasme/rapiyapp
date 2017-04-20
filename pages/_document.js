import React from 'react';
import Document, {
    Main,
    NextScript,
    Head,
} from 'next/document';


class Rapiyapp extends Document {

    render() {
        return (
            <html>
            <Head>

                <title>RapiYApp</title>
                <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
                <link href="https://cdnjs.cloudflare.com/ajax/libs/normalize/6.0.0/normalize.min.css" rel="stylesheet" />
                <link rel="shortcut icon" type="image/ico" href="../static/favicon.ico" />


                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.98.0/css/materialize.min.css" />

                <script src="https://code.jquery.com/jquery-2.1.1.min.js"></script>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.98.0/js/materialize.min.js"></script>

                <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
                <link href="https://fonts.googleapis.com/css?family=Quicksand" rel="stylesheet" />
            </Head>
            <body bgcolor="#EEEEEE">

            <Main />
            <NextScript />

            </body>

            </html>
        )
    }
}

export default Rapiyapp;