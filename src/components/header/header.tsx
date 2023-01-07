type HeaderProps = {
  mainColor: string | undefined;
  textColor: string | undefined;
  heading: string;
};

export const Header = ({mainColor, textColor, heading}: HeaderProps): JSX.Element => (
  <header className='header news__header' style={{backgroundColor: mainColor}}>
    <div className='news__heading' style={{color: textColor}}>{heading}</div>
  </header>
);