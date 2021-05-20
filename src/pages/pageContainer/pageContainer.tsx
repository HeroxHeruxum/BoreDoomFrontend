import "./pageContainer.scss";
import {Header} from "../../components/header/header";
import {Imprint} from "../../components/imprint/imprint";


interface PageContainerProps {
    children: JSX.Element | JSX.Element[]
}

export function PageContainer(props: PageContainerProps): JSX.Element {
    return (
        <div className="pageContainer">
            <header>
                <Header/>
            </header>
            <body>
                {props.children}
            </body>
            <footer>
                <Imprint/>
            </footer>
        </div>
    );
}