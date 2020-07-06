import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "../../hooks/useAppContext";
import classNames from "classnames";
import { CopyToClipboard } from "react-copy-to-clipboard";
import * as Icons from "../../style/icons";
const fileDownload = require("js-file-download");

export const Preview = () => {
  const [{ iconToPreview }] = useContext(AppContext);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (copied) {
      const interval = setInterval(() => {
        setCopied(false);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [copied]);

  return (
    <aside className="prd-preview">
      {iconToPreview.svg && iconToPreview.svg !== "" ? (
        <>
          <div
            className={classNames("icon-preview", {
              "show-preview":
                iconToPreview !== undefined && iconToPreview.svg !== undefined,
            })}
          >
            <div className="ratio-container">
              <div className="inner-container">
                <img
                  src={`data:image/svg+xml,${encodeURIComponent(
                    iconToPreview.svg
                  )}`}
                  alt="selected icon"
                />
              </div>
            </div>
            <span className="icon-name">{iconToPreview.name}</span>
          </div>
          <div className="preview-actions">
            <CopyToClipboard
              text={iconToPreview.svg}
              onCopy={() => setCopied(true)}
            >
              <button
                onClick={() => setCopied(true)}
                className={classNames({ "is-copied": copied })}
              >
                {copied ? (
                  <span className="icon-wrapper">
                    {Icons.Check}
                    <span>Copied</span>
                  </span>
                ) : (
                  <span className="icon-wrapper">
                    {Icons.Copy}
                    <span>Copy</span>
                  </span>
                )}
              </button>
            </CopyToClipboard>
            <button
              onClick={() =>
                fileDownload(iconToPreview.svg, `${iconToPreview.name}.svg`)
              }
            >
              <span className="icon-wrapper">
                {Icons.Download}
                <span>Download</span>
              </span>
            </button>
          </div>
        </>
      ) : (
        <span className="no-preview-msg">Preview is not available</span>
      )}
    </aside>
  );
};
