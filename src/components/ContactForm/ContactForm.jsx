import React, { useState } from 'react';
import css from './ContactForm.module.css';
import { nanoid } from 'nanoid';
import { useDispatch, useSelector } from 'react-redux';
import { selectContacts } from '../../redux/selectors';
import { addContact } from '../../redux/operation';

export function ContactForm() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const contacts = useSelector(selectContacts);
  const dispatch = useDispatch();

  const formatPhoneNumber = input => {
    const phoneNumber = input.replace(/[^0-9]/g, '').slice(0, 10);

    let formattedNumber = '';
    if (phoneNumber.length >= 1) {
      formattedNumber = `(${phoneNumber.slice(0, 3)}`;
    }
    if (phoneNumber.length > 3) {
      formattedNumber += `)${phoneNumber.slice(3, 6)}`;
    }
    if (phoneNumber.length > 6) {
      formattedNumber += `-${phoneNumber.slice(6, 8)}`;
    }
    if (phoneNumber.length > 8) {
      formattedNumber += `-${phoneNumber.slice(8, 10)}`;
    }

    return formattedNumber;
  };

  const handleInputChange = event => {
    const { name, value } = event.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        const formattedValue = formatPhoneNumber(value);
        setNumber(formattedValue);
        break;
      default:
        break;
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    const addContacts = contact => {
      if (
        contacts.some(
          contactItem => contactItem.name.toLowerCase() === name.toLowerCase()
        )
      ) {
        alert(`Oops, ${contact.name} is already in contacts!`);
        return;
      }
      dispatch(addContact({ name, number, id: nanoid() }));
    };
    addContacts({ name, number });
    setName('');
    setNumber('');
  };

  return (
    <form onSubmit={handleSubmit} className={css.formContact}>
      <label>
        <span>Name</span>
        <input
          className={css.formName}
          type="text"
          name="name"
          value={name}
          onChange={handleInputChange}
          // pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash, and spaces."
          required
        />
      </label>
      <label>
        <span>Number</span>
        <input
          className={css.formNumber}
          type="tel"
          name="number"
          value={number}
          onChange={handleInputChange}
          placeholder="(000)-000-00-00"
          title="Phone number must be digits and can contain spaces, dashes, and parentheses."
          required
        />
      </label>
      <button type="submit" className={css.buttonAdd}>
        Add contact
      </button>
    </form>
  );
}
