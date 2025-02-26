import LevelButton from "../components/LevelButton"

export default function Lessons(){
    const Columns = () =>
    <div className=" w-full bg-gray-200 h-100 grid grid-cols-3 bg-gray-200 shadow-lg p-10 rounded-lg">
    <div style={{ transform: 'translateX(25px)' }} className="col-span-1 font-bold text-3xl ">Scales</div>
    <div style={{ transform: 'translateX(20px)' }} className="col-span-1 font-bold text-3xl ">Rhythm</div>
    <div style={{ transform: 'translateX(10px)' }} className="col-span-1 font-bold text-3xl ">Dynamics</div>
    <button className="col-span-1 font-semibold text-2xl w-40 bg-[#455090] text-white py-2  
    rounded-lg hover:bg-[#102437] mt-4 ">Level 1</button>
    <button className="col-span-1 font-semibold text-2xl w-40 bg-[#455090] text-white py-2  
    rounded-lg hover:bg-[#102437] mt-4 ">Level 1</button>
    <button className="col-span-1 font-semibold text-2xl w-40 bg-[#455090] text-white py-2  
    rounded-lg hover:bg-[#102437] mt-4">Level 1</button>
    <button className="col-span-1 font-semibold text-2xl w-40 bg-[#455090] text-white py-2  
    rounded-lg hover:bg-[#102437] mt-4">Level 2</button>
    <button className="col-span-1 font-semibold text-2xl w-40 bg-[#455090] text-white py-2  
    rounded-lg hover:bg-[#102437] mt-4">Level 2</button>
    <button className="col-span-1 font-semibold text-2xl w-40 bg-[#455090] text-white py-2  
    rounded-lg hover:bg-[#102437] mt-4">Level 2</button>
    <button className="col-span-1 font-semibold text-2xl w-40 bg-[#455090] text-white py-2  
    rounded-lg hover:bg-[#102437] mt-4">Level 3</button>
    <button className="col-span-1 font-semibold text-2xl w-40 bg-[#455090] text-white py-2  
    rounded-lg hover:bg-[#102437] mt-4">Level 3</button>
    <button className="col-span-1 font-semibold text-2xl w-40 bg-[#455090] text-white py-2  
    rounded-lg hover:bg-[#102437] mt-4">Level 3</button>
    <button className="col-span-1 font-semibold text-2xl w-40 bg-[#455090] text-white py-2  
    rounded-lg hover:bg-[#102437] mt-4">Level 4</button>
    <button className="col-span-1 font-semibold text-2xl w-40 bg-[#455090] text-white py-2  
    rounded-lg hover:bg-[#102437] mt-4">Level 4</button>
    <button className="col-span-1 font-semibold text-2xl w-40 bg-[#455090] text-white py-2  
    rounded-lg hover:bg-[#102437] mt-4">Level 4</button>
    </div>

    
    return (
        <main>
        <h1 className="text-center font-bold text-2xl">Music Theory Lessons</h1>
        <Columns/>
        </main>
    );
}