import "./pageContainer.scss";
import {Header} from "../../components/header/header";
import {Impressum} from "../../components/impressum/impressum";


interface PageContainerProps {
    children: JSX.Element
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
                <Impressum/>
            </footer>
        </div>
    );
}