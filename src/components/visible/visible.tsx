interface VisibleProps {
    if: boolean,
    children: JSX.Element | JSX.Element[]
}

export function Visible(props: VisibleProps) {
    if (props.if) {
        return <div>{props.children}</div>
    } else {
        return null
    }
}