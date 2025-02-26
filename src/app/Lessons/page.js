import LevelButton from "../components/LevelButton"

export default function Lessons(){
    const Columns = () =>
    <div className=" w-full bg-gray-100 h-100 grid grid-cols-3 bg-gray-200 shadow-sm p-10 rounded-lg">
    <div className="col-span-1 text-bold text-4xl ">Scales</div>
    <div className="col-span-1 text-bold text-4xl ">Rhythm</div>
    <div className="col-span-1 text-bold text-4xl ">Dynamics</div>
    <LevelButton level="1"  />
    <LevelButton level="1"  />
    <LevelButton level="1"  />
    <LevelButton level="2"  />
    <LevelButton level="2"  />
    <LevelButton level="2"  />
    <LevelButton level="3"  />
    <LevelButton level="3"  />
    <LevelButton level="3"  />
    </div>

    
    return (
        <main>
        <h1 className="text-center font-bold text-2xl">Music Theory Lessons</h1>
        <Columns/>
        </main>
    );
}