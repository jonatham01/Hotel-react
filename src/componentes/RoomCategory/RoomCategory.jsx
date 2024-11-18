import React,{useState,useEffect} from 'react'
import useForm from '../../hooks/useForm'
import { CreateRoomCategory } from './CreateRoomCategory';
import { ShowRoomCategory } from './ShowRoomCategory';

export const RoomCategory = () => {
    const url ='http://localhost:8090/api/roomcategories';
    const emptyForm = {
        id:null,
        name:'',
        price:0,
        url:"",
        description:"",
        television:false,
        air:false,
        nocturne:false,
        serviceAlways:false,
        coffeeMaker:false,
        cooler:false,
        security:false,
        automatizationLed:false,
        visitorService:false,
        clock:false,
        laptop:false,
        dryer:false,
        phone:false,
        seaView:false,
        nameError:false,
        priceError:false,
        urlError:false,
        descriptionError:false
    }
    const [RoomCategories, setRoomCategories] = useState([])
    const[formValues,handleChange,setValues] =useForm(emptyForm);
    
    useEffect(() => {
        console.log(RoomCategories.length)
      if(RoomCategories.length===0){
        const findCategories =async()=>{
            const response = await fetch(`${url}/find/all`);
            if(!response.ok)console.error("error al cargar informacion");
            const data = await response.json();
            setRoomCategories(data);
            
        } 
        findCategories();
      }
    }, [])
    
    const updateCategory =async(id,newCategory) =>{
        try{
            const response= await fetch(
                `${url}/put/${id}`,{
                    method:"PUT",
                    headers:{"content-type":"application/json"},
                    body:JSON.stringify(newCategory)
                }
            );
            if(!response.ok)throw new Error("Put fallido");
            const updatedCategory = await response.json();
            setRoomCategories(
                RoomCategories.map((category)=> {
                    if(category.id===id){return updatedCategory}
                    return category;
                })
                
            );
        }catch(error){
            console.error("error encontrado:" , error.message);
        }
    }

    return (
    <>
    <header className='top-menu'>
            <p className='web-name'>Hotel-manager</p>
            <div className="options-right">
                <p>Admin</p>
                <p>Sitio web</p>
                <div className='user'>
                    <p>Jonathan</p>
                    <p>Admin</p>
                </div>
            </div>
    </header>

    <div className="content">
        <header className="left-menu">
                <p className='on-left-menu'><Link className='no-underline' to="/">Panel</Link></p>
                <p ><Link className='no-underline' to="/tipocamas">Tipos de camas</Link></p>
                <p><Link className='no-underline' to="/camas">Camas</Link></p>
                <p>Habitaciones</p>
                <p ><Link className='no-underline' to="/tipohabitaciones">Tipos de habitaciones</Link></p>
            </header>
        <main>
            <div className="main-content">
                <CreateRoomCategory
                      setRoomCategories={setRoomCategories}
                      formValues= {formValues}
                      setValues={setValues}
                      handleChange={handleChange}
                      emptyForm={emptyForm}
                      url={url}
                      updateCategory={updateCategory}
                />
                <ShowRoomCategory 
                    url={url}
                    setRoomCategories={setRoomCategories}
                    RoomCategories = {RoomCategories}
                    setValues = {setValues}
                />
            </div>
        </main>

    </div>

    </>
  )
}
