import { useEffect, useState } from 'react'
import { useAppSelector } from '../hooks/hooks';
import { Category, Iprops } from '../types';

interface ISubMenu{
    submenuIsOpen: boolean;
    currentProps: Iprops;
    redirect: (id: number)=>void
}

export default function Submenu({submenuIsOpen, currentProps, redirect} : ISubMenu) {    
    const { categoryList } = useAppSelector((state) => state.products);
    const [list, setList] = useState<Category[]>([])
         
    useEffect(()=>{        
        if(categoryList.length > 0){
            setList(categoryList.filter((cat) => currentProps.listId.includes(cat.id)))
        }       
    },[currentProps])

  return (
    <div>
        {submenuIsOpen && <div className="catalog__subcatalog">
              <h3 className="catalog__subtitle">{currentProps.title}</h3>
              <ul className="catalog__sublist">
                  {list.length>0 && list.map((cat) => {
                      return (
                          <li key={cat.id} className="catalog__subitem">
                              <button
                                  onClick={() => redirect(cat.id)}
                                  type="button"
                                  className="catalog__btn"
                              >
                                  {cat.name[0].toUpperCase() + cat.name.slice(1)}
                              </button>
                          </li>
                      );
                  })}
              </ul>
          </div>
        
      }
    </div>
  )
}
