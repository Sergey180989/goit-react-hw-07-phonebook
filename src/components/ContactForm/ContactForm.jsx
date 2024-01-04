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
    const phoneNumber = input.replace(/[^0-9]/g, '');

    let formattedNumber = '';
    if (phoneNumber.length >= 1) {
      formattedNumber = `(${phoneNumber.slice(0, 3)})`;
    }
    if (phoneNumber.length > 3) {
      formattedNumber += `${phoneNumber.slice(3, 6)}-`;
    }
    if (phoneNumber.length > 6) {
      formattedNumber += `${phoneNumber.slice(6, 8)}-`;
    }
    if (phoneNumber.length > 8) {
      formattedNumber += `${phoneNumber.slice(8, 10)}`;
    }

    return formattedNumber;
  };
  const [formattedNumber, setFormattedNumber] = useState('');

  const handleInputChange = event => {
    const { name, value } = event.target;

    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        if (value.length < formattedNumber.length) {
          setFormattedNumber(prev => prev.slice(0, -1));
          setNumber(prev => formatPhoneNumber(prev.slice(0, -1)));
        } else {
          const formattedValue = formatPhoneNumber(value);
          setNumber(formattedValue);
          setFormattedNumber(formattedValue);
        }
        break;
      default:
        break;
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (
      contacts.some(
        contactItem => contactItem.number.toLowerCase() === number.toLowerCase()
      )
    ) {
      alert(`Oops, ${number} is already in contacts!`);
      return;
    }
    dispatch(addContact({ name, number, id: nanoid() }));
    setName('');
    setNumber('');
    setFormattedNumber('');
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
          title="Name may contain only letters, apostrophe, dash and spaces."
          required
        />
      </label>
      <label>
        <span>Number</span>
        <input
          className={css.formNumber}
          type="tel"
          name="number"
          value={formattedNumber}
          onChange={handleInputChange}
          placeholder="(000)-000-00-00"
          // pattern="[(]{1}[0-9]{3}[)]{1}-[0-9]{3}-[0-9]{2}-[0-9]{2}"
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
