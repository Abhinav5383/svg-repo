import "./Loading.css";

const Loading = () => {
  return (

    <div className="loading-screen">

      <div className="loading-wrapper">
        <div className="bg"></div>

        <div className="content">

          <div className="icon loader loader--style2">

            <svg className="spinner" stroke="currentColor" viewBox="0 0 66 66">
              <circle className="path" fill="none" strokeWidth="6" strokeLinecap="round" cx="33" cy="33" r="30"></circle>
            </svg>

          </div>

          <div className="text">Loading...</div>
        </div>
      </div>

    </div>

  )
}

export default Loading