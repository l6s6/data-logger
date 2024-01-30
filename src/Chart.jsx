/*
import React, { useState } from 'react';
import Papa from 'papaparse';
import Plot from 'react-plotly.js';

const CsvPlotter = () => {
  const [csvData, setCsvData] = useState({
    uptime: [],
    GNSS_PPS_Timestamp: [],
  });

  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    Papa.parse(file, {
      header: true,
      delimiter: ';', // CSV-Trennzeichen
      dynamicTyping: true,
      //Die erste Zeilen überspringen bis Daten beginnen
      beforeFirstChunk: (chunk) => {
        const lines = chunk.split('\n');
        const headerIndex = lines.findIndex((line) =>
          line.includes('CSV_DATA_SECTION_BEGIN')
        );
        lines.splice(0, headerIndex + 1);
        return lines.join('\n');
      },
      complete: (result) => {
        console.log(result.data[0]);
        const uptime = result.data.map((row) => row['Uptime [s]']);
        const GNSS_PPS_Timestamp = result.data.map(
          (row) => row['GNSS: PPS Timestamp [s]']
        );

        setCsvData({
          uptime,
          GNSS_PPS_Timestamp,
        });
      },
      error: (error) => {
        console.error('Fehler beim Parsen der CSV-Datei:', error);
      },
    });
  };

  return (
    <div>
      <input type='file' onChange={handleFileUpload} />
      {csvData.uptime.length > 0 && (
        <Plot
          data={[
            {
              x: csvData.uptime,
              y: csvData.GNSS_PPS_Timestamp,
              type: 'scatter',
              mode: 'lines',
              name: 'Temperature',
            },
            {
              x: csvData.uptime,
              y: csvData.GNSS_PPS_Timestamp,
              type: 'scatter',
              mode: 'lines',
              name: 'Speed',
            },
          ]}
          layout={{
            width: 800,
            height: 400,
            title: 'CSV Daten Plot',
            xaxis: { title: 'Time' },
          }}
        />
      )}
    </div>
  );
};

export default CsvPlotter;
*/

/*
import React, { useState } from 'react';
import Papa from 'papaparse';
import Plot from 'react-plotly.js';

const CsvPlotter = () => {
  const [csvData, setCsvData] = useState({
    'Uptime [s]': [],
    'GNSS: PPS Timestamp [s]': [],
    'GNSS: UTC date time (ISO 8601)': [],
    'GNSS: Fix type (0=no fix, others=fix)': [],
    'GNSS: Latitude [degrees]': [],
    'GNSS: Longitude [degrees]': [],
    'GNSS: Positional dilution of precision': [],
    'GNSS: Altitude [m] (above Mean Sea Level)': [],
    'GNSS: Ground speed [km/h]': [],
    'GNSS: Satellites in view': [],
    'GNSS: Altitude [m] (above ellipsoid)': [],
    'Temperature: Board [degC]': [],
    'Temperature: Ext LM75 1 [degC]': [],
    'Temperature: Ext MS8607 1 [degC]': [],
    'Pressure: Ext MS8607 [hPa]': [],
    'Humidity: Ext MS8607 [%]': [],
    'Light Intensity: UVA index []': [],
    'Volt: Supply Voltage [V]': [],
    'Volt: 3.3V board voltage [V]': [],
    'Volt: 5V board voltage [V]': [],
    'Volt: Vin1 voltage [V]': [],
    'Volt: Vin2 voltage [V]': [],
    'Volt: Vin3 voltage [V]': [],
    'IO: In 1 State': [],
    'IO: In 1 Timestamp [s]': [],
    'IO: In 2 State': [],
    'IO: In 2 Timestamp [s]': [],
    'IO: Out 1 State': [],
    'IO: Out 1 Timestamp [s]': [],
    'IO: Out 2 State': [],
    'IO: Out 2 Timestamp [s]': [],
  });

  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    Papa.parse(file, {
      header: true,
      delimiter: ';',
      dynamicTyping: true,
      complete: (result) => {
        const headers = result.meta.fields || [];
        const data = result.data;

        const dataSectionIndex = data.findIndex(
          (row) => row['Uptime [s]'] === 'CSV_DATA_SECTION_BEGIN'
        );
        const relevantData = data.slice(dataSectionIndex + 1);

        const structuredData = relevantData.reduce((acc, row) => {
          headers.forEach((header) => {
            if (!acc[header]) {
              acc[header] = [];
            }
            acc[header].push(row[header]);
          });
          return acc;
        }, {});

        setCsvData(structuredData);
      },
      error: (error) => {
        console.error('Fehler beim Parsen der CSV-Datei:', error);
      },
    });
  };

  return (
    <div>
      <input type='file' onChange={handleFileUpload} />
      {csvData['Uptime [s]'] && (
        <Plot
          data={[
            {
              x: csvData['Uptime [s]'],
              y: csvData['Temperature: Board [degC]'],
              type: 'scatter',
              mode: 'lines',
              name: 'Temperature: Board [degC]',
            },
            {
              x: csvData['Uptime [s]'],
              y: csvData['GNSS: Ground speed [km/h]'],
              type: 'scatter',
              mode: 'lines',
              name: 'GNSS: Ground speed [km/h]',
            },
            // Füge weitere Linien nach Bedarf hinzu
          ]}
          layout={{
            width: 800,
            height: 400,
            title: 'CSV Daten Plot',
            xaxis: { title: 'Uptime [s]' },
          }}
        />
      )}
    </div>
  );
};

export default CsvPlotter;
*/

import React, { useState } from 'react';
import Papa from 'papaparse';
import Plot from 'react-plotly.js';

const CsvPlotter = () => {
  const [csvData, setCsvData] = useState({
    Uptime: [],
    GNSS_PPS_Timestamp: [],
    GNSS_UTC_date_time: [],
    GNSS_Fix_type: [],
    GNSS_Latitude: [],
    GNSS_Longitude: [],
    GNSS_Positional_dilution_of_precision: [],
    GNSS_Altitude_above_Mean_Sea_Level: [],
    GNSS_Ground_speed: [],
    GNSS_Satellites_in_view: [],
    GNSS_Altitude_above_ellipsoid: [],
    Temperature_Board: [],
    Temperature_Ext_LM75: [],
    Temperature_Ext_MS8607: [],
    Pressure_Ext_MS8607: [],
    Humidity_Ext_MS8607: [],
    Light_Intensity_UVA_index: [],
    Volt_Supply_Voltage: [],
    Volt_3_3V_board_voltage: [],
    Volt_5V_board_voltage: [],
    Volt_Vin1_voltage: [],
    Volt_Vin2_voltage: [],
    Volt_Vin3_voltage: [],
    IO_In_1_State: [],
    IO_In_1_Timestamp: [],
    IO_In_2_State: [],
    IO_In_2_Timestamp: [],
    IO_Out_1_State: [],
    IO_Out_1_Timestamp: [],
    IO_Out_2_State: [],
    IO_Out_2_Timestamp: [],
  });

  const [summary, setSummary] = useState({
    Max_Temperature_Board: 0, //Maximale Innentemperatur
    Min_Temperature_Board: 0, //Minimale Innentemperatur
    Max_Temperature_Ext_MS8607: 0, //Maximale Außentemperatur
    Min_Temperature_Ext_MS8607: 0, //Minimale Außentemperatur
    Max_GNSS_Altitude_above_Mean_Sea_Level: 0, //Maximale Höhe über Meeresspiegel
    Max_GNSS_Altitude_above_ellipsoid: 0, //Maximale Höhe von Start
    Max_GNSS_Ground_speed: 0, //Maximale Geschwindigkeit
    Min_Pressure_Ext_MS8607: 0, //Minimaler Druck
    Max_Pressure_Ext_MS8607: 0, //Maximaler Druck
    Max_Humidity_Ext_MS8607: 0, //Maximale Luftfeuchtigkeit
    Min_Humidity_Ext_MS8607: 0, //Minimale Luftfeuchtigkeit
  });

  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    Papa.parse(file, {
      header: true,
      delimiter: ';', // CSV-Trennzeichen
      dynamicTyping: true,
      //Die erste Zeilen überspringen bis Daten beginnen
      beforeFirstChunk: (chunk) => {
        const lines = chunk.split('\n');
        const headerIndex = lines.findIndex((line) =>
          line.includes('CSV_DATA_SECTION_BEGIN')
        );
        lines.splice(0, headerIndex + 1);
        return lines.join('\n');
      },
      complete: (result) => {
        // MAPPING DATA
        const Uptime = result.data.map((row) => row['Uptime [s]']);
        const GNSS_PPS_Timestamp = result.data.map(
          (row) => row['GNSS: PPS Timestamp [s]']
        );
        const GNSS_UTC_date_time = result.data.map(
          (row) => row['GNSS: UTC date time (ISO 8601)']
        );
        const GNSS_Fix_type = result.data.map(
          (row) => row['GNSS: Fix type (0=no fix, others=fix)']
        );
        const GNSS_Latitude = result.data.map(
          (row) => row['GNSS: Latitude [degrees]']
        );
        const GNSS_Longitude = result.data.map(
          (row) => row['GNSS: Longitude [degrees]']
        );
        const GNSS_Positional_dilution_of_precision = result.data.map(
          (row) => row['GNSS: Positional dilution of precision']
        );
        const GNSS_Altitude_above_Mean_Sea_Level = result.data.map(
          (row) => row['GNSS: Altitude [m] (above Mean Sea Level)']
        );
        const GNSS_Ground_speed = result.data.map(
          (row) => row['GNSS: Ground speed [km/h]']
        );
        const GNSS_Satellites_in_view = result.data.map(
          (row) => row['GNSS: Satellites in view']
        );
        const GNSS_Altitude_above_ellipsoid = result.data.map(
          (row) => row['GNSS: Altitude [m] (above ellipsoid)']
        );
        const Temperature_Board = result.data.map(
          (row) => row['Temperature: Board [degC]']
        );
        const Temperature_Ext_LM75 = result.data.map(
          (row) => row['Temperature: Ext LM75 1 [degC]']
        );
        const Temperature_Ext_MS8607 = result.data.map(
          (row) => row['Temperature: Ext MS8607 1 [degC]']
        );
        const Pressure_Ext_MS8607 = result.data.map(
          (row) => row['Pressure: Ext MS8607 [hPa]']
        );
        const Humidity_Ext_MS8607 = result.data.map(
          (row) => row['Humidity: Ext MS8607 [%]']
        );
        const Light_Intensity_UVA_index = result.data.map(
          (row) => row['Light Intensity: UVA index []']
        );
        const Volt_Supply_Voltage = result.data.map(
          (row) => row['Volt: Supply Voltage [V]']
        );
        const Volt_3_3V_board_voltage = result.data.map(
          (row) => row['Volt: 3.3V board voltage [V]']
        );
        const Volt_5V_board_voltage = result.data.map(
          (row) => row['Volt: 5V board voltage [V]']
        );
        const Volt_Vin1_voltage = result.data.map(
          (row) => row['Volt: Vin1 voltage [V]']
        );
        const Volt_Vin2_voltage = result.data.map(
          (row) => row['Volt: Vin2 voltage [V]']
        );
        const Volt_Vin3_voltage = result.data.map(
          (row) => row['Volt: Vin3 voltage [V]']
        );
        const IO_In_1_State = result.data.map((row) => row['IO: In 1 State']);
        const IO_In_1_Timestamp = result.data.map(
          (row) => row['IO: In 1 Timestamp [s]']
        );
        const IO_In_2_State = result.data.map((row) => row['IO: In 2 State']);
        const IO_In_2_Timestamp = result.data.map(
          (row) => row['IO: In 2 Timestamp [s]']
        );
        const IO_Out_1_State = result.data.map((row) => row['IO: Out 1 State']);
        const IO_Out_1_Timestamp = result.data.map(
          (row) => row['IO: Out 1 Timestamp [s]']
        );
        const IO_Out_2_State = result.data.map((row) => row['IO: Out 2 State']);
        const IO_Out_2_Timestamp = result.data.map(
          (row) => row['IO: Out 2 Timestamp [s]']
        );
        console.log(Temperature_Board);

        setCsvData({
          Uptime,
          GNSS_PPS_Timestamp,
          GNSS_UTC_date_time,
          GNSS_Fix_type,
          GNSS_Latitude,
          GNSS_Longitude,
          GNSS_Positional_dilution_of_precision,
          GNSS_Altitude_above_Mean_Sea_Level,
          GNSS_Ground_speed,
          GNSS_Satellites_in_view,
          GNSS_Altitude_above_ellipsoid,
          Temperature_Board,
          Temperature_Ext_LM75,
          Temperature_Ext_MS8607,
          Pressure_Ext_MS8607,
          Humidity_Ext_MS8607,
          Light_Intensity_UVA_index,
          Volt_Supply_Voltage,
          Volt_3_3V_board_voltage,
          Volt_5V_board_voltage,
          Volt_Vin1_voltage,
          Volt_Vin2_voltage,
          Volt_Vin3_voltage,
          IO_In_1_State,
          IO_In_1_Timestamp,
          IO_In_2_State,
          IO_In_2_Timestamp,
          IO_Out_1_State,
          IO_Out_1_Timestamp,
          IO_Out_2_State,
          IO_Out_2_Timestamp,
        });

        //Wert für die Zusammenfassung berechnen
        const V_Temperature_Board = Temperature_Board.filter(
          (value) => typeof value === 'number' && !isNaN(value)
        );
        const V_Temperature_Ext_MS8607 = Temperature_Ext_MS8607.filter(
          (value) => typeof value === 'number' && !isNaN(value)
        );
        const V_GNSS_Altitude_above_Mean_Sea_Level =
          GNSS_Altitude_above_Mean_Sea_Level.filter(
            (value) => typeof value === 'number' && !isNaN(value)
          );
        const V_GNSS_Altitude_above_ellipsoid =
          GNSS_Altitude_above_ellipsoid.filter(
            (value) => typeof value === 'number' && !isNaN(value)
          );
        const V_GNSS_Ground_speed = GNSS_Ground_speed.filter(
          (value) => typeof value === 'number' && !isNaN(value)
        );
        const V_Pressure_Ext_MS8607 = Pressure_Ext_MS8607.filter(
          (value) => typeof value === 'number' && !isNaN(value)
        );
        const V_Humidity_Ext_MS8607 = Humidity_Ext_MS8607.filter(
          (value) => typeof value === 'number' && !isNaN(value)
        );
        setSummary({
          Max_Temperature_Board: Math.max(...V_Temperature_Board),
          Min_Temperature_Board: Math.min(...V_Temperature_Board),
          Max_Temperature_Ext_MS8607: Math.max(...V_Temperature_Ext_MS8607),
          Min_Temperature_Ext_MS8607: Math.min(...V_Temperature_Ext_MS8607),
          Max_GNSS_Altitude_above_Mean_Sea_Level: Math.max(
            ...V_GNSS_Altitude_above_Mean_Sea_Level
          ),
          Max_GNSS_Altitude_above_ellipsoid: Math.max(
            ...V_GNSS_Altitude_above_ellipsoid
          ),
          Max_GNSS_Ground_speed: Math.max(...V_GNSS_Ground_speed),
          Max_Pressure_Ext_MS8607: Math.max(...V_Pressure_Ext_MS8607),
          Min_Pressure_Ext_MS8607: Math.min(...V_Pressure_Ext_MS8607),
          Max_Humidity_Ext_MS8607: Math.max(...V_Humidity_Ext_MS8607),
          Min_Humidity_Ext_MS8607: Math.min(...V_Humidity_Ext_MS8607),
        });
      },
      error: (error) => {
        console.error('Fehler beim Parsen der CSV-Datei:', error);
      },
    });
  };

  return (
    <div>
      <input type='file' onChange={handleFileUpload} />

      {csvData.Uptime.length > 0 && (
        <div className='flex justify-around'>
          <div className='h-96 bg-gray-100 rounded-2xl mt-20 justify-center px-8 py-4'>
            <p className='text-2xl font-bold mb-4'>Zusammenfassung</p>
            <p>Minimale Innentemperatur: {summary.Min_Temperature_Board}</p>
            <p>Maximale Innentemperatur: {summary.Max_Temperature_Board}</p>
            <p>
              Minimale Außentemperatur: {summary.Min_Temperature_Ext_MS8607}
            </p>
            <p className='mb-4'>
              Maximale Außentemperatur: {summary.Max_Temperature_Ext_MS8607}
            </p>
            <p className='mb-4'>
              Maximale Höhe (Meeresspiegel):{' '}
              {summary.Max_Temperature_Ext_MS8607}
            </p>
            <p className='mb-4'>
              Maximale Höhe (Start): {summary.Max_Temperature_Ext_MS8607}
            </p>
            <p className='mb-4'>
              Minimaler Druck: {summary.Max_Temperature_Ext_MS8607}
            </p>
            <p className='mb-4'>
              Maximaler Druck: {summary.Max_Temperature_Ext_MS8607}
            </p>
            <p className='mb-4'>
              Maximale Außentemperatur: {summary.Max_Temperature_Ext_MS8607}
            </p>
            <p className='mb-4'>
              Maximale Außentemperatur: {summary.Max_Temperature_Ext_MS8607}
            </p>
          </div>

          <Plot
            data={[
              {
                x: csvData.Uptime,
                y: csvData.Temperature_Board,
                type: 'scatter',
                mode: 'lines',
                name: 'Temperature_Board',
              },
              {
                x: csvData.Uptime,
                y: csvData.Temperature_Ext_MS8607,
                type: 'scatter',
                mode: 'lines',
                name: 'Temperature_Ext_MS8607',
              },
            ]}
            layout={{
              width: 1000,
              height: 500,
              title: 'Wetterbalon Daten',
              xaxis: { title: 'Time' },
            }}
          />
        </div>
      )}
    </div>
  );
};

export default CsvPlotter;
