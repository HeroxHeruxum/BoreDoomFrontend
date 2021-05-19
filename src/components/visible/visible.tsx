interface VisibleProps {
    if: boolean,
    children: JSX.Element
}

export function Visible(props: VisibleProps) {
    if (props.if) {
        return props.children
    } else {
        return null
    }
}