// import AppBar from "../components/AppBar/AppBar";

export default function layout({ children }) {
    return (
        <div>
            <AppBar />
            {children}
        </div>
    );
}