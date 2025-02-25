export default function SheetMusicTools(){
    return (
        <main>
            <div className="reader_container">
                <h1>Sheet Music Reader</h1>
                <button>Upload file</button>
                <p>Piece Title: </p>
                <p>Key: </p>
                <p>Time Signature: </p>
                <p>Composer: </p>
            </div>

            <br />
            
            <div className="composer_container">
                <h1>Sheet Music Composer</h1>
                <form>
                    <label>Enter Title: <input name="title"></input></label>
                    <br />
                    <label>Enter Composer Name: <input name="title"></input></label>
                    <br />
                    <label>Enter Key: <input name="title"></input></label>
                    <br />
                    <label>Enter Time Signature: <input name="title"></input></label>
                </form>
            </div>
        </main>
    );
}