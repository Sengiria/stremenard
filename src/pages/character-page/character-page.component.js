import './character-page.styles.scss';

const CharacterPage = () => {
    return ( 
        <section className='split'>
            <div className='screen'
            style={{
                background: "url('images/character-bg.jpg')"
            }}>
                <div className='card' >
                    <div className='image-box'>
                        <img src="images/characters/raccoon/raccoon.png" alt="" />
                    </div>
                </div>
            </div>
            <div className='screen'>
                <div className='card'>
                    <div className='image-box'>
                        <img src="" alt="" />
                    </div>
                    <h2>Asd</h2>
                </div>
            </div>

        </section>
     );
}
 
export default CharacterPage;