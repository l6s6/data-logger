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
    Avg_Temperature_Board: 0, //Durchscnittliche Innentemperatur
    SD_Temperature_Board: 0, //Durchscnittliche Innentemperatur
    Max_Temperature_Ext_MS8607: 0, //Maximale Außentemperatur
    Min_Temperature_Ext_MS8607: 0, //Minimale Außentemperatur
    Avg_Temperature_Ext_MS8607: 0, //Durchscnittliche Außentemperatur
    SD_Temperature_Ext_MS8607: 0, //Durchscnittliche Außentemperatur
    Max_GNSS_Altitude_above_Mean_Sea_Level: 0, //Maximale Höhe über Meeresspiegel
    Max_GNSS_Ground_speed: 0, //Maximale Geschwindigkeit
    Min_Pressure_Ext_MS8607: 0, //Minimaler Druck
    Max_Pressure_Ext_MS8607: 0, //Maximaler Druck
    Avg_Pressure_Ext_MS8607: 0, //Durchscnittlicher Druck
    SD_Pressure_Ext_MS8607: 0, //Durchscnittlicher Druck
    Max_Humidity_Ext_MS8607: 0, //Maximale Luftfeuchtigkeit
    Min_Humidity_Ext_MS8607: 0, //Minimale Luftfeuchtigkeit
    Avg_Humidity_Ext_MS8607: 0, //Durchscnittliche Luftfeuchtigkeit
    SD_Humidity_Ext_MS8607: 0, //Durchscnittliche Luftfeuchtigkeit
    Max_Light_Intensity_UVA_index: 0, //Maximaler UV Index
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
        const V_Light_Intensity_UVA_index = Light_Intensity_UVA_index.filter(
          (value) => typeof value === 'number' && !isNaN(value)
        );

        const Avg_Temperature_Board =
          Math.round(
            (V_Temperature_Board.reduce((a, b) => a + b) /
              V_Temperature_Board.length) *
              100
          ) / 100;

        const Avg_Temperature_Ext_MS8607 =
          Math.round(
            (V_Temperature_Ext_MS8607.reduce((a, b) => a + b) /
              V_Temperature_Ext_MS8607.length) *
              100
          ) / 100;

        const Avg_Pressure_Ext_MS8607 =
          Math.round(
            (V_Pressure_Ext_MS8607.reduce((a, b) => a + b) /
              V_Pressure_Ext_MS8607.length) *
              100
          ) / 100;

        const Avg_Humidity_Ext_MS8607 =
          Math.round(
            (V_Humidity_Ext_MS8607.reduce((a, b) => a + b) /
              V_Humidity_Ext_MS8607.length) *
              100
          ) / 100;

        setSummary({
          Max_Temperature_Board: Math.max(...V_Temperature_Board),
          Min_Temperature_Board: Math.min(...V_Temperature_Board),
          Avg_Temperature_Board,
          SD_Temperature_Board:
            Math.round(
              Math.sqrt(
                V_Temperature_Board.reduce(
                  (acc, value) =>
                    acc + Math.pow(value - Avg_Temperature_Board, 2),
                  0
                ) / V_Temperature_Board.length
              ) * 100
            ) / 100,

          Max_Temperature_Ext_MS8607: Math.max(...V_Temperature_Ext_MS8607),
          Min_Temperature_Ext_MS8607: Math.min(...V_Temperature_Ext_MS8607),
          Avg_Temperature_Ext_MS8607,
          SD_Temperature_Ext_MS8607:
            Math.round(
              Math.sqrt(
                V_Temperature_Ext_MS8607.reduce(
                  (acc, value) =>
                    acc + Math.pow(value - Avg_Temperature_Ext_MS8607, 2),
                  0
                ) / V_Temperature_Ext_MS8607.length
              ) * 100
            ) / 100,

          Max_GNSS_Altitude_above_Mean_Sea_Level: Math.max(
            ...V_GNSS_Altitude_above_Mean_Sea_Level
          ),

          Max_GNSS_Ground_speed: Math.max(...V_GNSS_Ground_speed),

          Max_Pressure_Ext_MS8607: Math.max(...V_Pressure_Ext_MS8607),
          Min_Pressure_Ext_MS8607: Math.min(...V_Pressure_Ext_MS8607),
          Avg_Pressure_Ext_MS8607,
          SD_Pressure_Ext_MS8607:
            Math.round(
              Math.sqrt(
                V_Pressure_Ext_MS8607.reduce(
                  (acc, value) =>
                    acc + Math.pow(value - Avg_Pressure_Ext_MS8607, 2),
                  0
                ) / V_Pressure_Ext_MS8607.length
              ) * 100
            ) / 100,

          Max_Humidity_Ext_MS8607: Math.max(...V_Humidity_Ext_MS8607),
          Min_Humidity_Ext_MS8607: Math.min(...V_Humidity_Ext_MS8607),
          Avg_Humidity_Ext_MS8607,
          SD_Humidity_Ext_MS8607:
            Math.round(
              Math.sqrt(
                V_Humidity_Ext_MS8607.reduce(
                  (acc, value) =>
                    acc + Math.pow(value - Avg_Humidity_Ext_MS8607, 2),
                  0
                ) / V_Humidity_Ext_MS8607.length
              ) * 100
            ) / 100,
          Max_Light_Intensity_UVA_index: Math.max(
            ...V_Light_Intensity_UVA_index
          ),
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

  const yAxisTitle = {
    title: {
      text:
        yAxis === 'Temperature'
          ? 'Innentemperatur [C]'
          : yAxis === 'Height'
          ? 'Höhe [m]'
          : yAxis === 'Voltage'
          ? 'Volt [V]'
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

  const yAxisValue1 =
    yAxis === 'Temperature'
      ? csvData.Temperature_Board
      : yAxis === 'Height'
      ? csvData.GNSS_Altitude_above_Mean_Sea_Level
      : yAxis === 'Voltage'
      ? csvData.Volt_Supply_Voltage
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
      : yAxis === 'Speed'
      ? csvData.Vertical_Speed
      : null;

  const graphLabel1 =
    yAxis === 'Temperature'
      ? 'Innentemperatur [C]'
      : yAxis === 'Height'
      ? 'Höhe [m]'
      : yAxis === 'Voltage'
      ? 'Spannung [V]'
      : yAxis === 'Speed'
      ? 'Geschwindigkeit [km/h]'
      : yAxis === 'Pressure'
      ? 'Druck [hPa]'
      : yAxis === 'Humidity'
      ? 'Luftfeuchtigkeit [%]'
      : yAxis === 'Light'
      ? 'UV Index'
      : null;
  const graphLabel2 =
    yAxis === 'Temperature'
      ? 'Außentemperatur [C]'
      : yAxis === 'Speed'
      ? 'Geschwindigkeit [km/h]'
      : null;

  return (
    <div>
      {!csvData.Uptime.length > 0 ? (
        <input type='file' onChange={handleFileUpload} />
      ) : (
        <div className=''>
          <div className='flex justify-between px-20'>
            <div className='bg-gray-100 rounded-2xl mt-20  justify-center px-8 py-4'>
              <p className='text-2xl font-bold mb-4'>Zusammenfassung</p>
              <p>
                Minimale Innentemperatur: {summary.Min_Temperature_Board} [C]
              </p>
              <p>
                Maximale Innentemperatur: {summary.Max_Temperature_Board} [C]
              </p>
              <p>
                Minimale Außentemperatur: {summary.Min_Temperature_Ext_MS8607}{' '}
                [C]
              </p>
              <p className='mb-4'>
                Maximale Außentemperatur: {summary.Max_Temperature_Ext_MS8607}{' '}
                [C]
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
                data={
                  yAxis === 'Temperature' || yAxis === 'Speed'
                    ? [
                        {
                          x: xAxisValue,
                          y: yAxisValue1,
                          type: 'scatter',
                          mode: 'lines',
                          name: graphLabel1,
                          showlegend: true,
                        },
                        {
                          x: xAxisValue,
                          y: yAxisValue2,
                          type: 'scatter',
                          mode: 'lines',
                          name: graphLabel2,
                          showlegend: true,
                        },
                      ]
                    : [
                        {
                          x: xAxisValue,
                          y: yAxisValue1,
                          type: 'scatter',
                          mode: 'lines',
                          name: graphLabel1,
                          showlegend: true,
                        },
                      ]
                }
                layout={{
                  width: 1000,
                  height: 500,
                  title: 'Wetterbalon Daten',
                  xaxis: xAxisTitle,
                  yaxis: yAxisTitle,
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
                  label='UV Index'
                  value={yAxis === 'Light'}
                  onChange={() => handleChangeY('Light')}
                />
                <Checkbox
                  label='Spannung'
                  value={yAxis === 'Voltage'}
                  onChange={() => handleChangeY('Voltage')}
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
          <div className='bg-gray-100 mt-20  justify-center px-20 py-4'>
            <p className='text-2xl font-bold mb-4'>Fortgeschrittene Analyse</p>
            <div className='grid grid-cols-4'>
              <div>
                <p>
                  Minimale Innentemperatur: {summary.Min_Temperature_Board} [C]
                </p>
                <p>
                  Maximale Innentemperatur: {summary.Max_Temperature_Board} [C]
                </p>
                <p>
                  Durchschnittliche Innentemperatur:{' '}
                  {summary.Avg_Temperature_Board} [C]
                </p>
                <p className='mb-12'>
                  Standardabweichung Innentemperatur:{' '}
                  {summary.SD_Temperature_Board} [C]
                </p>
              </div>
              <div>
                <p>
                  Minimale Außentemperatur: {summary.Min_Temperature_Ext_MS8607}{' '}
                  [C]
                </p>
                <p>
                  Maximale Außentemperatur: {summary.Max_Temperature_Ext_MS8607}{' '}
                  [C]
                </p>
                <p>
                  Durchschnittliche Außentemperatur:{' '}
                  {summary.Avg_Temperature_Ext_MS8607} [C]
                </p>
                <p className='mb-12'>
                  Standardabweichung Außentemperatur:{' '}
                  {summary.SD_Temperature_Ext_MS8607} [C]
                </p>
              </div>
              <div>
                <p>Maximaler Druck: {summary.Max_Pressure_Ext_MS8607} [hPa]</p>
                <p>Minimaler Druck: {summary.Min_Pressure_Ext_MS8607} [hPa]</p>
                <p>
                  Durchschnittlicher Druck: {summary.Avg_Pressure_Ext_MS8607}{' '}
                  [hPa]
                </p>
                <p className='mb-12'>
                  Standardabweichung Druck: {summary.SD_Pressure_Ext_MS8607}{' '}
                  [hPa]
                </p>
              </div>
              <div>
                <p>
                  Maximale Luftfeuchtigkeit: {summary.Max_Humidity_Ext_MS8607}{' '}
                  [%]
                </p>
                <p>
                  Minimale Luftfeuchtigkeit: {summary.Min_Humidity_Ext_MS8607}{' '}
                  [%]
                </p>
                <p>
                  Durchschnittliche Luftfeuchtigkeit:{' '}
                  {summary.Avg_Humidity_Ext_MS8607} [%]
                </p>
                <p className='mb-12'>
                  Standardabweichung Luftfeuchtigkeit:{' '}
                  {summary.SD_Humidity_Ext_MS8607} [%]
                </p>
              </div>
              <p>
                Maximale Höhe (Meeresspiegel):{' '}
                {summary.Max_GNSS_Altitude_above_Mean_Sea_Level} [m]
              </p>
              <p>
                Maximale Geschwindigkeit: {summary.Max_GNSS_Ground_speed} [km/h]
              </p>
              <p>Maximaler UV Index: {summary.Max_Light_Intensity_UVA_index}</p>
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
      <input
        type='checkbox'
        className='mr-2'
        checked={value}
        onChange={onChange}
      />
      {label}
    </label>
  );
};

export default CsvPlotter;
