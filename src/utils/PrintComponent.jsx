import React, { useRef } from "react";
import QRCode from "qrcode.react";
import { QRCodeSVG } from "qrcode.react";
import { QRCodeCanvas } from "qrcode.react";
import moneyFormat from "./MoneyFormat";
import dateTimeFormat from "./dateTimeFormat";

const PrintComponent = ({ data }) => {
  const printRef = useRef();

  const handlePrint = () => {
    const printContents = printRef.current.innerHTML;
    const originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;

    // Mengembalikan fungsi event listener untuk menyegarkan halaman setelah print
    window.location.reload();
  };

  return (
      <div>
        <button onClick={handlePrint}>Print</button>
        <div ref={printRef} id="print-area" className="print-area">
          <div style={{ textAlign: 'center', margin: '10mm 0' }}>
            <QRCodeSVG value={data.barcode} size={100} /><br />
            <small>{data.barcode}</small>
            <strong>{dateTimeFormat(data.created_at)}</strong>
          </div>

        </div>
      </div>
    
     
    
        
    
  );
};

export default PrintComponent;
