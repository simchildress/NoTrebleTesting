export default function Community(){
    return (
        <main>
            <div className="create_container">
                <h1>Community Posts</h1>
                    <label>Let's share what going...</label>
                        <input
                            type="text"
                            name="post"
                        />
                    <button>CREATE POST</button>
            </div>
        </main>
    );
}