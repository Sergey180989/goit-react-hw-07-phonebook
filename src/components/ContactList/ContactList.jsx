import css from './ContactList.module.css';
import { ContactListItem } from '../ContactListItem/ContactListItem';
import { useSelector } from 'react-redux';
import { getFilterContacts } from '../../redux/selectors';

export function ContactList() {
  const filteredContacts = useSelector(getFilterContacts);

  return (
    <ul className={css.contactList}>
      {filteredContacts.map(({ id, name, number }) => (
        <ContactListItem key={id} name={name} number={number} buttonId={id} />
      ))}
    </ul>
  );
}
