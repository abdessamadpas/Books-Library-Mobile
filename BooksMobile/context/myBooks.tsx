import { createContext, useContext, ReactNode, useState } from 'react'; 

type MyBooksContextType ={
        onToggleSaved: (book: Book) => void,
        isBookSaved:(book: Book)=> boolean,
        savedBooks: Book[]
}

const  MyBooksContext = createContext<MyBooksContextType>({
    onToggleSaved: () => {},
        isBookSaved:()=> false,
        savedBooks: []
})

type Props= {
    children: ReactNode,
}

const MyBooksProvider = ({children}: Props)=>{

    const [savedBooks, setSavedBooks]=useState<Book[]>([])

    const areBooksTheSame = (a:Book, b:Book)=>{
        JSON.stringify(a) == JSON.stringify(b)
    }

    const onToggleSaved = (book: Book) =>{

        if(isBookSaved(book)){
            //remove from saved
            setSavedBooks((books=> 
                books.filter(savedBook=>
                    //! BTW the syntax 
                    /*
                        areBooksTheSame(savedBook, book)
                        don't wanna work , propet the error msg:
                     (   An expression of type 'void' cannot be tested for truthiness)
                    */

                    JSON.stringify(savedBook) !== JSON.stringify(book)) 
                ))
        } else{
            // add to saved
            setSavedBooks(books=> [book, ...books])
        }
        setSavedBooks((books)=>[book,...books])
    } 

    const isBookSaved = (book:Book) => {
        return savedBooks.some((savedBook) => 
            areBooksTheSame(savedBook, book)
            )
       };

    return(
        <MyBooksContext.Provider value={{onToggleSaved, isBookSaved, savedBooks}}>
            {children}
        </MyBooksContext.Provider>
    );
};

export const useMyBooks = ()=>useContext(MyBooksContext) 

export default MyBooksProvider;