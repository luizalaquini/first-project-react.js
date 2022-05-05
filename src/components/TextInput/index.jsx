import './style.css'

export const TextInput = ({searchValue, handleChange}) => {
    return (
        <input 
            className='text-input'
            placeholder='Pesquisa'
            type="search" 
            onChange={handleChange} 
            value={searchValue}
        />
    );
}