import React, { useState } from 'react';
import Papa from 'papaparse';
import Plot from 'react-plotly.js';

const CsvPlotter = () => {
  const [yAxis, setYAxis] = React.useState('Temperature');
  const handleChangeY = (newValue) => {
    setYAxis(newValue);
  };

  const [xAxis, setXAxis] = React.useState('Uptime');
  const handleChangeX = (newValue) => {
    setXAxis(newValue);
  };

  const [csvData, setCsvData] = useState({
    Uptime: [],
    Uptime_Min: [],
    GNSS_PPS_Timestamp: [],
    GNSS_UTC_date_time: [],
    GNSS_Fix_type: [],
    GNSS_Latitude: [],
    GNSS_Longitude: [],
    GNSS_Positional_dilution_of_precision: [],
    GNSS_Altitude_above_Mean_Sea_Level: [],
    GNSS_Ground_speed: [],
    Vertical_Speed: [],
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

        const Vertical_Speed = calculateVelocity(
          GNSS_Altitude_above_Mean_Sea_Level,
          Uptime
        );

        const convertSecondsToMinutes = (seconds) => seconds / 60;
        const Uptime_Min = Uptime.map(convertSecondsToMinutes);

        setCsvData({
          Uptime,
          Uptime_Min,
          GNSS_PPS_Timestamp,
          GNSS_UTC_date_time,
          GNSS_Fix_type,
          GNSS_Latitude,
          GNSS_Longitude,
          GNSS_Positional_dilution_of_precision,
          GNSS_Altitude_above_Mean_Sea_Level,
          GNSS_Ground_speed,
          Vertical_Speed,
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

  const calculateVelocity = (heightData, timeData) => {
    // Annahme: heightData und timeData sind Arrays der gleichen Länge
    const velocityData = [];

    for (let i = 1; i < heightData.length; i++) {
      const heightChange = heightData[i] - heightData[i - 1];
      const timeChange = timeData[i] - timeData[i - 1];
      const velocity = heightChange / timeChange;
      velocityData.push(velocity * 3.6);
    }

    return velocityData;
  };

  const xAxisTitle = {
    title: {
      text:
        xAxis === 'Uptime'
          ? 'Zeit [min]'
          : xAxis === 'Height'
          ? 'Höhe [m]'
          : xAxis === 'Pressure'
          ? 'Druck [hPa]'
          : null,
    },
  };

  const xAxisValue =
    xAxis === 'Uptime'
      ? csvData.Uptime_Min
      : xAxis === 'Height'
      ? csvData.GNSS_Altitude_above_Mean_Sea_Level
      : xAxis === 'Pressure'
      ? csvData.Pressure_Ext_MS8607
      : null;

  const yAxisTitle1 = {
    title: {
      text:
        yAxis === 'Temperature'
          ? 'Innentemperatur [C]'
          : yAxis === 'Height'
          ? 'Höhe [m]'
          : yAxis === 'Speed'
          ? 'Geschwindigkeit [km/h]'
          : yAxis === 'Pressure'
          ? 'Druck [hPa]'
          : yAxis === 'Humidity'
          ? 'Luftfeuchtigkeit [%]'
          : yAxis === 'Light'
          ? 'UV Index'
          : null,
    },
  };
  const yAxisTitle2 = {
    title: {
      text:
        yAxis === 'Temperature'
          ? 'Außentemperatur [C]'
          : yAxis === 'Speed'
          ? 'Steiggeschwindigkeit [km/h]'
          : null,
    },
  };

  const yAxisValue1 =
    yAxis === 'Temperature'
      ? csvData.Temperature_Board
      : yAxis === 'Height'
      ? csvData.GNSS_Altitude_above_Mean_Sea_Level
      : yAxis === 'Speed'
      ? csvData.GNSS_Ground_speed
      : yAxis === 'Pressure'
      ? csvData.Pressure_Ext_MS8607
      : yAxis === 'Humidity'
      ? csvData.Humidity_Ext_MS8607
      : yAxis === 'Light'
      ? csvData.Light_Intensity_UVA_index
      : null;
  const yAxisValue2 =
    yAxis === 'Temperature'
      ? csvData.Temperature_Ext_MS8607
      : yAxis === 'Height'
      ? csvData.GNSS_Altitude_above_Mean_Sea_Level
      : yAxis === 'Speed'
      ? csvData.Vertical_Speed
      : yAxis === 'Pressure'
      ? csvData.Pressure_Ext_MS8607
      : yAxis === 'Humidity'
      ? csvData.Humidity_Ext_MS8607
      : yAxis === 'Light'
      ? csvData.Light_Intensity_UVA_index
      : null;

  return (
    <div>
      <input type='file' onChange={handleFileUpload} />

      {csvData.Uptime.length > 0 && (
        <div className='flex justify-around'>
          <div className='bg-gray-100 rounded-2xl mt-20 justify-center px-8 py-4'>
            <p className='text-2xl font-bold mb-4'>Zusammenfassung</p>
            <p>Minimale Innentemperatur: {summary.Min_Temperature_Board} [C]</p>
            <p>Maximale Innentemperatur: {summary.Max_Temperature_Board} [C]</p>

            <p>
              Minimale Außentemperatur: {summary.Min_Temperature_Ext_MS8607} [C]
            </p>
            <p className='mb-4'>
              Maximale Außentemperatur: {summary.Max_Temperature_Ext_MS8607} [C]
            </p>
            <p>
              Maximale Höhe (Meeresspiegel):{' '}
              {summary.Max_GNSS_Altitude_above_Mean_Sea_Level} [m]
            </p>
            <p className='mb-4'>
              Maximale Geschwindigkeit: {summary.Max_GNSS_Ground_speed} [km/h]
            </p>
            <p>Maximaler Druck: {summary.Max_Pressure_Ext_MS8607} [hPa]</p>
            <p className='mb-4'>
              Minimaler Druck: {summary.Min_Pressure_Ext_MS8607} [hPa]
            </p>

            <p>
              Maximale Luftfeuchtigkeit: {summary.Max_Humidity_Ext_MS8607} [%]
            </p>
            <p className='mb-4'>
              Minimale Luftfeuchtigkeit: {summary.Min_Humidity_Ext_MS8607} [%]
            </p>
          </div>
          <div className='flex flex-col justify-start'>
            <Plot
              data={[
                {
                  x: xAxisValue,
                  y: yAxisValue1,
                  type: 'scatter',
                  mode: 'lines',
                  name: yAxisTitle1,
                },
                {
                  x: xAxisValue,
                  y: yAxisValue2,
                  type: 'scatter',
                  mode: 'lines',
                  name: yAxisTitle2,
                },
              ]}
              layout={{
                width: 1000,
                height: 500,
                title: 'Wetterbalon Daten',
                xaxis: xAxisTitle,
                yaxis: {
                  title: {
                    text: 'Temperatur [°C]',
                  },
                },
              }}
            />
            <div className='flex gap-4'>
              <span>y-Achse: </span>
              <Checkbox
                label='Temperatur'
                value={yAxis === 'Temperature'}
                onChange={() => handleChangeY('Temperature')}
              />
              <Checkbox
                label='Höhe'
                value={yAxis === 'Height'}
                onChange={() => handleChangeY('Height')}
              />
              <Checkbox
                label='Geschwindigkeit'
                value={yAxis === 'Speed'}
                onChange={() => handleChangeY('Speed')}
              />
              <Checkbox
                label='Druck'
                value={yAxis === 'Pressure'}
                onChange={() => handleChangeY('Pressure')}
              />
              <Checkbox
                label='Luftfeuchtigkeit'
                value={yAxis === 'Humidity'}
                onChange={() => handleChangeY('Humidity')}
              />
              <Checkbox
                label='Lichtintensität'
                value={yAxis === 'Light'}
                onChange={() => handleChangeY('Light')}
              />
            </div>
            <div className='flex gap-4'>
              <span>x-Achse: </span>
              <Checkbox
                label='Zeit'
                value={xAxis === 'Uptime'}
                onChange={() => handleChangeX('Uptime')}
              />
              <Checkbox
                label='Höhe'
                value={xAxis === 'Height'}
                onChange={() => handleChangeX('Height')}
              />{' '}
              <Checkbox
                label='Druck'
                value={xAxis === 'Pressure'}
                onChange={() => handleChangeX('Pressure')}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Checkbox = ({ label, value, onChange }) => {
  return (
    <label>
      <input type='checkbox' checked={value} onChange={onChange} />
      {label}
    </label>
  );
};

export default CsvPlotter;
