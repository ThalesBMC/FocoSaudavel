import Document, {Html,Head,Main, NextScript} from 'next/document';
/* eu criei isso para poder repetir coisas em todas as partes no caso a fonte e que 
nao coloquei no app tsx que faz isso tbm que eu poderia colocar o Head la pq 
o document so carrega uma vez, que e oq eu preciso para as fontes por exemplo enquanto o app carrega mais
de uma podendo deixar o app menos eficiente*/
export default class MyDocument extends Document {
    render(){
        return(
            <Html>
                <Head>  
                    <link rel="shortcut icon" href="favicon.png" type="image/pnmg"/>
                    <link rel="preconnect" href="https://fonts.gstatic.com"/>
                    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@600&family=Rajdhani:wght@600&display=swap" rel="stylesheet"/>
                </Head>
                <body>
                    <Main/>
                    <NextScript/>
                </body>
            </Html>
        )
    }
}