import { useDispatch, useSelector } from 'react-redux';
import { setFilterdContacts } from '../../redux/slice';
import css from './Filter.module.css';

export function Filter() {
  const currentFilter = useSelector(state => state.filter);
  // const contacts = useSelector(state => state.contacts.items);
  const dispatch = useDispatch();

  const handleFilterChange = event => {
    const { value } = event.target;
    dispatch(setFilterdContacts(value));
  };

  // const filteredContacts = contacts.filter(contact =>
  //   contact.name.toLowerCase().includes(currentFilter.toLowerCase())
  // );

  return (
    <div>
      <p>Find contacts by name</p>
      <input
        className={css.inputFilter}
        type="text"
        name="filter"
        value={currentFilter}
        onChange={handleFilterChange}
      />
      {/* <p>Filtered contacts: {filteredContacts.length}</p> */}
    </div>
  );
}
