export default function Lessons(){
    
    const Columns = () =>
    <div className=" w-full bg-gray-100 h-100 grid grid-cols-3 bg-gray-200 shadow-sm p-10 rounded-lg">
    <div className="col-span-1 text-bold text-4xl ">Scales</div>
    <div className="col-span-1 text-bold text-4xl ">Rhythm</div>
    <div className="col-span-1 text-bold text-4xl ">Dynamics</div>
    <button className="col-span-1 text-semibold text-2xl w-40 bg-[#455090] text-white py-2  
    rounded-lg hover:bg-[#102437] mt-4 ">Level 1</button>
    <button className="col-span-1 text-semibold text-2xl w-40 bg-[#455090] text-white py-2  
    rounded-lg hover:bg-[#102437] mt-4 ">Level 1</button>
    <button className="col-span-1 text-semibold text-2xl w-40 bg-[#455090] text-white py-2  
    rounded-lg hover:bg-[#102437] mt-4">Level 1</button>
    <button className="col-span-1 text-semibold text-2xl w-40 bg-[#455090] text-white py-2  
    rounded-lg hover:bg-[#102437] mt-4">Level 2</button>
    <button className="col-span-1 text-semibold text-2xl w-40 bg-[#455090] text-white py-2  
    rounded-lg hover:bg-[#102437] mt-4">Level 2</button>
    <button className="col-span-1 text-semibold text-2xl w-40 bg-[#455090] text-white py-2  
    rounded-lg hover:bg-[#102437] mt-4">Level 2</button>
    <button className="col-span-1 text-semibold text-2xl w-40 bg-[#455090] text-white py-2  
    rounded-lg hover:bg-[#102437] mt-4">Level 3</button>
    <button className="col-span-1 text-semibold text-2xl w-40 bg-[#455090] text-white py-2  
    rounded-lg hover:bg-[#102437] mt-4">Level 3</button>
    <button className="col-span-1 text-semibold text-2xl w-40 bg-[#455090] text-white py-2  
    rounded-lg hover:bg-[#102437] mt-4">Level 3</button>
    </div>

    
    return (
        <main>
        <h1 className="text-center font-bold text-2xl">Music Theory Lessons</h1>
        <Columns/>
        </main>
    );
}