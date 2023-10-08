import "./Details.css";
import CloseIcon from "../../../assets/CloseIcon";
import { useEffect, useState } from "react";
import CopyIcon from "../../../assets/CopyIcon";
import DownloadIcon from "../../../assets/DownloadIcon";
import LinkIcon from "../../../assets/LinkIcon";
import ResetBtn from "../../../assets/ResetBtn";


const Details = ({
  selectedIcon,
  setSelectedIcon,
  popupIds,
  currPopup,
  setcurrPopup,
  notificationTypes,
  createToast
}) => {


  const colorOptions = [
    "#FFFFFF",
    "#212529",
    "#FF5733",
    "#FFD700",
    "#FF1493",
    "#0077B5",
    "#FF9900",
    "#E50914",
    "#0090EB",
    "#FF3E00",
    "#34A853",
    "#800080",
    "#FF00FF",
    "#00FFFF",
  ];

  const [svg_color, setSvg_color] = useState("#FFFFFF");
  const [details_panel_theme, setDetails_panel_theme] = useState("#212529");
  const [dimensions, setDimensions] = useState({
    width: 45,
    height: 45
  });
  const [dimensions_linked, setDimensions_linked] = useState(true);
  const [is_icon_state_changed, setIs_icon_state_changed] = useState(false);


  const copy_data = () => {
    try {
      navigator.clipboard.writeText(selectedIcon.data);
      createToast("Copied to clipboard", notificationTypes.success);
    } catch (error) {
      createToast("Unable to copy", notificationTypes.success);
    }
  }

  const download_icon = () => {

    createToast("Downloading the icon ...", notificationTypes.success);

    setTimeout(async () => {
      try {
        // Create a Blob from the SVG text
        const blob = new Blob([selectedIcon.data], { type: 'image/svg+xml' });

        // Create a URL htmlFor the Blob
        const blobUrl = window.URL.createObjectURL(blob);

        // Create a download link
        const a = document.createElement('a');
        a.href = blobUrl;
        a.download = await selectedIcon?.iconName + ".svg"; // Specify the filename

        // Trigger a click event to initiate the download
        a.click();

        // Release the Blob URL
        window.URL.revokeObjectURL(blobUrl);

      } catch (error) {
        createToast(error.message, notificationTypes.success);

      }
    }, 1000);
  }

  const reset_icon_state_changes = () => {
    setSvg_color(colorOptions[0]);
    setDetails_panel_theme("#212529");
    setDimensions({
      width: 45,
      height: 45
    })
  }

  const copy_current_color = () => {
    navigator.clipboard.writeText(svg_color);
    createToast("Color copied to clipboard", notificationTypes.success);
  }


  useEffect(() => {
    if (svg_color !== "#FFFFFF" || details_panel_theme !== "#212529" || dimensions.width !== 45 || dimensions.height !== 45) {
      setIs_icon_state_changed(true);
    }
    else {
      setIs_icon_state_changed(false);
    }

  }, [dimensions, svg_color, details_panel_theme])


  useEffect(() => {
    if (details_panel_theme === svg_color) {
      if (details_panel_theme === "#FFFFFF") {
        setSvg_color(colorOptions[1]);
      }
      else {
        setSvg_color(colorOptions[0]);
      }
    }
  }, [details_panel_theme])

  return (

    <div className="details">
      <div className="wrapper">

        <div className="bg" onClick={() => { setcurrPopup("") }}></div>

        <div className="content">

          <div className="top">
            <div className="details-title">{selectedIcon?.iconName.replaceAll("-", " ")}</div>
            <div className="closebtn" onClick={() => { setcurrPopup("") }}>
              < CloseIcon fill={"#FFF"} />
            </div>
          </div>

          <div className="content-main">
            <div className="icon-details">
              <div className="icon"
                dangerouslySetInnerHTML={{ __html: selectedIcon.data }}
                style={{
                  "--svg-color": svg_color,
                  "--background-color": details_panel_theme,
                  "--svg-height": `${dimensions.height || 1}%`,
                  "--svg-width": `${dimensions.width || 1}%`
                }}
              >

              </div>

              <div className="scheme-toggle"
                style={{
                  backgroundColor: details_panel_theme === "#FFFFFF" ? "#212529" : "#FFFFFF",
                  outline: `5px solid ${details_panel_theme}`
                }}

                onClick={() => {
                  details_panel_theme === "#FFFFFF" ? setDetails_panel_theme("#212529") : setDetails_panel_theme("#FFFFFF")
                }}
              ></div>

              <div className="currColor" onClick={copy_current_color}>
                <div className="wrapper">
                  <div className="color-name">{svg_color}</div>

                  <div className="tooltip">
                    <div className="text">Copy&nbsp;color</div>
                  </div>
                </div>
              </div>

              {
                is_icon_state_changed &&

                <div className="reset_button"
                  style={{
                    backgroundColor: details_panel_theme,
                    outline: `5px solid ${details_panel_theme}`,
                    "--svg-fill": details_panel_theme === "#FFFFFF" ? "#212529" : "#FFFFFF"
                  }}

                  onClick={reset_icon_state_changes}
                >
                  < ResetBtn />
                </div>
              }

            </div>

            <div className="sidebar">
              <div className="color-options">

                {
                  colorOptions?.map((option, i) => {

                    return (
                      <div className="color-option"
                        key={`${option}-${i + 1}`}
                        onClick={() => { setSvg_color(option) }}
                        style={{
                          backgroundColor: option,
                          outline: svg_color === option ? `2px solid ${option}` : "",
                          outlineOffset: "3px",
                          display: option === details_panel_theme ? "none" : "inline-block"
                        }}
                      >

                      </div>
                    )
                  })
                }

              </div>

              <div className="adjustments">
                <div className="dimensions">

                  <div className="width">
                    <div className="text">Width :</div>

                    <div className="input">
                      <input type="number" id="width-input"
                        placeholder="Width"
                        value={dimensions.width}
                        onChange={(e) => {

                          let max_limit = 85;
                          let min_limit = 0;
                          let input_val = e.target.value;

                          if (dimensions.width === max_limit && e.target.value > max_limit) {
                            input_val = input_val - dimensions.width * 10;
                          }

                          let newWidth = Number.parseInt(Math.min(max_limit, Math.max(min_limit, input_val)));
                          setDimensions({
                            width: newWidth,
                            height: dimensions_linked ? newWidth : dimensions.height
                          })

                        }}
                      />

                      <label htmlFor="width-input" className="unit">%</label>
                    </div>
                  </div>

                  <div className="link-icon">
                    <div className={`pseduo-wrapper ${dimensions_linked ? "linked" : ""}`}
                      onClick={() => { setDimensions_linked(!dimensions_linked) }}
                    >
                      < LinkIcon />
                    </div>
                  </div>

                  <div className="height">
                    <div className="text">Height :</div>

                    <div className="input">
                      <input type="number"
                        id="height-input"
                        placeholder="Height"
                        value={dimensions.height}
                        onChange={(e) => {

                          let max_limit = 85;
                          let min_limit = 0;
                          let input_val = e.target.value;

                          if (dimensions.height === max_limit && e.target.value > max_limit) {
                            input_val = input_val - dimensions.height * 10;
                          }

                          let newHeight = Number.parseInt(Math.min(max_limit, Math.max(min_limit, input_val)));
                          setDimensions({
                            width: dimensions_linked ? newHeight : dimensions.width,
                            height: newHeight
                          })


                        }}
                      />

                      <label htmlFor="height-input" className="unit">%</label>
                    </div>
                  </div>

                </div>
              </div>

            </div>

          </div>

          <div className="bottom">
            <div className="buttons">

              <div className="btn copy-btn" onClick={copy_data}>
                <div className="text">Copy</div>
                <CopyIcon />
              </div>

              <div className="btn download-btn" onClick={download_icon}>
                <div className="text">Download</div>
                < DownloadIcon />
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>

  )
}


export default Details;