import { useRef } from 'react';

import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <header className='flex flex-v-center flex-space-between'>
      <div className='header-profile flex flex-1'>
        <Link to='/profile'>
          <div className='profile-photo' style={{ backgroundImage: 'url("images/user_perfil.png")' }} />
        </Link>
      </div>
      <div className='header-center'>
        <div className='header-search flex flex-v-center'>
          <span
            tabIndex={0}
            role='button'
            onKeyDown={() => {}}
            onClick={() => {
              inputRef.current?.focus();
            }}
            className='material-symbols-outlined no-select'
          >
            search
          </span>
          <input ref={inputRef} type='text' name='search' id='search' placeholder='Search' />
        </div>
      </div>
      <div className='header-buttons flex flex-1 flex-v-center flex-end'>
          <Link to="/home" className='header-button flex flex-v-center flex-h-center'>
            <img src={"images/home_parco.png"} style={{ width: '1.2rem' }} />
            {/* <div className='profile-photo' style={{ backgroundImage: 'url("images/home_parco.png")', width: '2.8rem' }} /> */}
          </Link>
      </div>
      <div className='header-buttons flex flex-1 flex-v-center flex-end'>
        <Link to='/transactions' className='header-button flex flex-v-center flex-h-center'>
          <span className='material-symbols-outlined'>equalizer</span>
        </Link>
        <Link to='/cards' className='header-button flex flex-v-center flex-h-center'>
          <span className='material-symbols-outlined'>credit_card</span>
        </Link>
      </div>
    </header>
  );
};

export default Header;
