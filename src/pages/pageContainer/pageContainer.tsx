import "./pageContainer.scss";
import {Header} from "../../components/header/header";
import {Imprint} from "../../components/imprint/imprint";
import { Visible } from "../../components/visible/visible";


interface PageContainerProps {
    title?: string,
    children: JSX.Element | JSX.Element[]
}

export function PageContainer(props: PageContainerProps) {
    const {title, children} = props;

    return (
        <div className="pageContainer">
            <header>
                <Header/>
            </header>
            <body>
                <Visible if={!!title}>
                    <div className="pageTitle">
                        {title}
                    </div>
                </Visible>
                {children}
            </body>
            <footer>
                <Imprint/>
            </footer>
        </div>
    );
}