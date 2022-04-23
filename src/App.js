import styles from './App.module.css'

function App() {
  return (
    <div className={styles.container}>
      <div className={styles.subcontainer}>


        {/* ------------- */}
        {/* HI 👋🏻 SECTION */}
        <div className={styles.profile}>
          <img 
            src="https://avatars.githubusercontent.com/u/45586386?v=4"
            className={styles.pp}
          />
          <div className={styles.header}>hi, i’m parth 👋🏻</div>
        </div>
        {/* ------------- */}



        {/* ------------- */}
        {/* EXPERIENCE SECTION */}
        <div className={styles.jobs}>
          <div className={styles.jobitem}>
            <span>co-founder </span>
            <span className={styles.orangeyak}>
              <a href="https://orangeyak.co" target="_blank">@orangeyakco</a>
            </span>
          </div>

          <div className={styles.jobitem}>
            <span>design+tech lead </span>
            <span className={styles.conquest}>
              <a href="https://conquest.org.in" target="_blank">@conquestBITS</a>
            </span>
          </div>

          <div className={styles.jobitem}>
            <span>sophomore </span>
            <span className={styles.bits}>
              <a href="https://bits-pilani.ac.in" target="_blank">@BITSPilani</a>
            </span>
          </div>
        </div>
        {/* ------------- */}



        {/* ------------- */}
        {/* LINKS SECTION */}
        <div className={styles.links}>
          <span>
            <a 
              href="https://twitter.com/psrthsharma" 
              target="_blank"
            >twitter  -  </a>
          </span>

          <span>
            <a 
              href="https://github.com/psrth" 
              target="_blank"
            >github  -  </a> 
          </span>

          <span>
            <a 
              href="" 
              target="_blank"
            >resume  -  </a>
          </span>

          <span>
            <a 
              href="" 
              target="_blank"
            >email</a>
          </span>
        </div>
        {/* ------------- */}




      </div>
    </div>
  );
}

export default App;
