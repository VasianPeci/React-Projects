export default function Die(props) {
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    };

    return (
        <button aria-pressed={props.isHeld} aria-value={`Die with value ${props.value}, ${props.isHeld ? "held" : "not held"}`} onClick={props.hold} style={styles}>{props.value}</button>
    );
}