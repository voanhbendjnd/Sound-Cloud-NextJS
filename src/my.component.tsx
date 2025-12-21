const MyComponenent = () => {
    const name = "Bentenyson";
    const age = 12;
    const info = {
        name: "Havana",
        age: 23
    }
    const arr = [1, 2, 3];
    return (
        <div>

            <h1 style={{
                border: "4px solid green",
                borderRadius: "5px",
                color: "red"
            }}>{arr}</h1>
            <img
                src="https://i.imgur.com/yXOvdOSs.jpg"
                alt="Hedy Lamarr"
                className="photo"
            />
            <ul>
                <li>Invent new traffic lights </li>
                <li>Rehearse a movie scene </li>
                <li>Improve the spectrum technology</li>
            </ul>
        </div>
    )
}

export default MyComponenent;