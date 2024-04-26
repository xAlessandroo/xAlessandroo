import React from 'react';
import '../styles/ButtonSubmit.scss';

const ButtonSubmit = ({ isActive, handleClick }) => {
  return (
    <div className="wrapper">
      <button className={`submitBtn ${isActive ? 'is_active' : ''}`} onSubmit={handleClick}>
        <span className='submit'>{isActive ? 'Done' : 'Send'}</span>
        {isActive && (
          <div className="success">
            <svg
              xmlnsXlink="http://www.w3.org/1999/xlink"
              version="1.1"
              viewBox="0 0 29.756 29.756"
              style={{ enableBackground: 'new 0 0 29.756 29.756' }}
              xmlSpace="preserve"
              className='svg'
            >
              <path d="M29.049,5.009L28.19,4.151c-0.943-0.945-2.488-0.945-3.434,0L10.172,18.737l-5.175-5.173   c-0.943-0.944-2.489-0.944-3.432,0.001l-0.858,0.857c-0.943,0.944-0.943,2.489,0,3.433l7.744,7.752   c0.944,0.943,2.489,0.943,3.433,0L29.049,8.442C29.991,7.498,29.991,5.953,29.049,5.009z" />
            </svg>
          </div>
        )}
      </button>
    </div>
  );
};

export default ButtonSubmit;
