import { useState, useEffect, useCallback } from 'react';
import './style.css';

import { Posts } from '../../components/Posts';
import { loadPosts } from '../../utils/load-posts'
import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';

// Passando para Hooks:
export const Home = () => {

    const [posts, setPosts] = useState([]);
    const [allPosts, setAllPosts] = useState([]);
    const [page, setPages] = useState(0);
    const [postsPerPage] = useState(20);
    const [searchValue, setSearchValue] = useState('');

    const noMorePosts = page + postsPerPage >= allPosts.length;

    const filteredPosts = !!searchValue ? 
    allPosts.filter(post => {
        return post.title.toLowerCase().includes(searchValue.toLowerCase());
    }) 
    : posts; 

    const handleLoadPosts = useCallback(async (page, postsPerPage) => {
        const postsAndPhotos = await loadPosts();

        setPosts(postsAndPhotos.slice(page, postsPerPage));
        setAllPosts(postsAndPhotos);
    }, []);

    useEffect(() =>{ // pode atuar como qualquer um dos 3 lifecycle methods (componentDidMount, componentDidUpdate e componentWillUnmount)
        handleLoadPosts(0, postsPerPage);
    }, [handleLoadPosts, postsPerPage]);

    const loadMorePosts = () => {
        const nextPage = page + postsPerPage;
        const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage)
        posts.push(...nextPosts) //spread operator

        setPosts(posts);
        setPages(nextPage);
    }

    const handleChange = (e) => {
        const {value} = e.target;

        setSearchValue(value);
    }

    return (
        <section className='container'>
            
            <div className='search-container'>
                {!!searchValue && ( // se houver uma busca
                    <h1>Busca: {searchValue}</h1>
                )}

                <TextInput 
                    searchValue={searchValue} 
                    handleChange={handleChange}
                /> 
            </div>

            {filteredPosts.length > 0 ? 
            <Posts posts={filteredPosts}/>
            : <p>Nao foi possível encontrar =(</p> }

            {!searchValue && ( // se houver busca o botao nao funciona
                <Button 
                    text='Load more posts'
                    onClick={loadMorePosts}
                    disabled={noMorePosts}
                />
            )}
            
        </section>
    ); 
}

// [ANTERIORMENTE] usando classes
// export class Home extends Component {
//     state = {
//         posts: [],
//         allPosts: [],
//         page: 0,
//         postsPerPage: 20,
//         searchValue: ''
//     }

//     // Utilizaremos os dados disponibilizados em https://jsonplaceholder.typicode.com/ (DATA FETCHING)

//     componentDidMount(){
//        this.loadPosts();
//     }

//     loadPosts = async () => {
//         const {page, postsPerPage} = this.state;

//         const postsAndPhotos = await loadPosts();

//         this.setState({
//             posts: postsAndPhotos.slice(page, postsPerPage),
//             allPosts: postsAndPhotos
//         });
//     }

//     loadMorePosts = () => {
//         const { page, postsPerPage, allPosts, posts } = this.state; 
//         const nextPage = page + postsPerPage;
//         const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage)
//         posts.push(...nextPosts) //spread operator

//         this.setState({posts, page: nextPage});
//     }

//     handleChange = (e) => {
//         const {value} = e.target;
//         this.setState({searchValue: value});
//     }

//     render() {
//         const { posts, page, postsPerPage, allPosts, searchValue } = this.state;
//         const noMorePosts = page + postsPerPage >= allPosts.length;

//         // OPERAÇAO TERNÁRIA: se a condiçao for verdadeira faz oq ta antes dos dois 
//         // pontos (:), se for falsa faz oq está depois.
//         const filteredPosts = !!searchValue ? 
//         allPosts.filter(post => {
//             return post.title.toLowerCase().includes(searchValue.toLowerCase());
//         }) 
//         : posts; 
//         // !! converte para booleano (true/false)

//         return (
//             <section className='container'>
                
//                 <div className='search-container'>
//                     {!!searchValue && ( // se houver uma busca
//                         <h1>Busca: {searchValue}</h1>
//                     )}

//                     <TextInput 
//                         searchValue={searchValue} 
//                         handleChange={this.handleChange}
//                     /> 
//                 </div>

//                 {filteredPosts.length > 0 ? 
//                 <Posts posts={filteredPosts}/>
//                 : <p>Nao foi possível encontrar =(</p> }

//                 {!searchValue && ( // se houver busca o botao nao funciona
//                     <Button 
//                         text='Load more posts'
//                         onClick={this.loadMorePosts}
//                         disabled={noMorePosts}
//                     />
//                 )}
                
//             </section>
//         );      
//     }
// }