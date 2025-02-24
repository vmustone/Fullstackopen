const Header = ({text, size = "h1"}) => {
    const Tag = size;
    return (
        <Tag>{text}</Tag>
    )
}

export default Header