import React, { useEffect, useRef, useState } from 'react';
import Papa from 'papaparse';
import Plot from 'react-plotly.js';
import Dropdown from './Dropdown';

const CsvPlotter = () => {
  //Div Ref für den Container der Graphen
  const divRef = useRef();
  const [divWidth, setDivWidth] = useState(0);

  //Variable, die Angibt, was an y-Achse angezeigt wird
  const [yAxis, setYAxis] = useState('Temperatur');

  //Variable, die Angibt, was an x-Achse angezeigt wird
  const [xAxis, setXAxis] = useState('Zeit');

  const [smoothness, setSmoothness] = useState(25);

  //Optionen für die Dropdown Menus
  const optionsX = ['Zeit', 'Höhe', 'Druck'];

  const optionsY = [
    'Temperatur',
    'Höhe',
    'Geschwindigkeit',
    'Steiggeschwindigkeit',
    'Druck',
    'Luftfeuchtigkeit',
    'UV Index',
    'Spannung',
  ];

  const optionsSmooth = [1, 5, 10, 25, 50, 100];

  //Liste aller Daten, die von Sensor aufgezeichnet wurden
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

  //Liste aller Werte für die zusammenfassende Auswertung
  const [summaryData, setSummaryData] = useState({
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
    Voltage_Difference: 0, //Änderung der Spannung von Anfang zu Ende
  });

  //Funktion wird einmal beim Starten der Seite ausgeführt
  useEffect(() => {
    //Funktion, die die CSV Daten einliest und in den Arrays speichert
    const fetchData = async () => {
      const response = await fetch('/data.csv');
      const text = await response.text();

      //Parsen der CSV Datei
      Papa.parse(text, {
        header: true,
        delimiter: ';', // CSV-Trennzeichen
        dynamicTyping: true,

        //überspringen der ersten Zeilen, bis die Daten beginnen
        beforeFirstChunk: (chunk) => {
          const lines = chunk.split('\n');
          const headerIndex = lines.findIndex((line) =>
            line.includes('CSV_DATA_SECTION_BEGIN')
          );
          lines.splice(0, headerIndex + 1);
          return lines.join('\n');
        },

        //was passieren soll, wenn Daten erfolgreich geparsed wurde
        complete: (result) => {
          //Speichern aller Daten in den
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
          const IO_Out_1_State = result.data.map(
            (row) => row['IO: Out 1 State']
          );
          const IO_Out_1_Timestamp = result.data.map(
            (row) => row['IO: Out 1 Timestamp [s]']
          );
          const IO_Out_2_State = result.data.map(
            (row) => row['IO: Out 2 State']
          );
          const IO_Out_2_Timestamp = result.data.map(
            (row) => row['IO: Out 2 Timestamp [s]']
          );

          //Berechnung der Steiggeschwindigkeit
          const Vertical_Speed = calculateVelocity(
            GNSS_Altitude_above_Mean_Sea_Level,
            Uptime
          );

          //Umwandeln der Zeit in Minuten
          const convertSecondsToMinutes = (seconds) => seconds / 60;
          const Uptime_Min = Uptime.map(convertSecondsToMinutes);

          //Bereinigte Arrays, die nur Zahlen enthalten
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

          //Berechnung der Werte für die Zusammenfassung
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

          //Daten der CSV Datei in Arrays speichern
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

          //Werte für die Zusammenfassung speichern
          setSummaryData({
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
          }); // Funktion zum Mitteln und Durchschnitt bilden
        },

        //Fehler Nachricht
        error: (error) => {
          console.error('Fehler beim Parsen der CSV-Datei:', error);
        },
      });
    };

    fetchData();

    const getDivWidth = () => {
      if (divRef.current) {
        const width = divRef.current.clientWidth;
        setDivWidth(width);
      }
    };

    getDivWidth();

    window.addEventListener('resize', getDivWidth);

    return () => {
      window.removeEventListener('resize', getDivWidth);
    };
  }, []);

  //Steiggeschwindigkeit berechnen
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

  //X-Achsen Beschriftung je nach Checkbox
  const xAxisTitle = {
    title: {
      text:
        xAxis === 'Zeit'
          ? 'Zeit [min]'
          : xAxis === 'Höhe'
          ? 'Höhe [m]'
          : xAxis === 'Druck'
          ? 'Druck [hPa]'
          : null,
    },
  };

  //X-Achsen Werte je nach Checkbox
  const xAxisValue =
    xAxis === 'Zeit'
      ? csvData.Uptime_Min
      : xAxis === 'Höhe'
      ? csvData.GNSS_Altitude_above_Mean_Sea_Level
      : xAxis === 'Druck'
      ? csvData.Pressure_Ext_MS8607
      : null;

  //Y-Achsen Beschriftung je nach Checkbox
  const yAxisTitle = {
    title: {
      text:
        yAxis === 'Temperatur'
          ? 'Temperatur [C]'
          : yAxis === 'Höhe'
          ? 'Höhe [m]'
          : yAxis === 'Spannung'
          ? 'Spannung [V]'
          : yAxis === 'Geschwindigkeit'
          ? 'Geschwindigkeit [km/h]'
          : yAxis === 'Steiggeschwindigkeit'
          ? 'Steiggeschwindigkeit [km/h]'
          : yAxis === 'Druck'
          ? 'Druck [hPa]'
          : yAxis === 'Luftfeuchtigkeit'
          ? 'Luftfeuchtigkeit [%]'
          : yAxis === 'UV Index'
          ? 'UV Index'
          : null,
    },
  };

  //Y-Achsen Werte je nach Checkbox
  const yAxisValue1 =
    yAxis === 'Temperatur'
      ? csvData.Temperature_Board
      : yAxis === 'Höhe'
      ? csvData.GNSS_Altitude_above_Mean_Sea_Level
      : yAxis === 'Spannung'
      ? csvData.Volt_Supply_Voltage
      : yAxis === 'Geschwindigkeit'
      ? csvData.GNSS_Ground_speed
      : yAxis === 'Steiggeschwindigkeit'
      ? csvData.Vertical_Speed
      : yAxis === 'Druck'
      ? csvData.Pressure_Ext_MS8607
      : yAxis === 'Luftfeuchtigkeit'
      ? csvData.Humidity_Ext_MS8607
      : yAxis === 'UV Index'
      ? csvData.Light_Intensity_UVA_index
      : null;

  //Y-Achsen Werte je nach Checkbox für zweiten Graphen (Falls nötig)
  const yAxisValue2 =
    yAxis === 'Temperatur' ? csvData.Temperature_Ext_MS8607 : null;

  //Labes des ersten Graphen für die Legende
  const graphLabel1 =
    yAxis === 'Temperatur'
      ? 'Innentemperatur [C]'
      : yAxis === 'Höhe'
      ? 'Höhe [m]'
      : yAxis === 'Spannung'
      ? 'Spannung [V]'
      : yAxis === 'Geschwindigkeit'
      ? 'Geschwindigkeit [km/h]'
      : yAxis === 'Steiggeschwindigkeit'
      ? 'Steiggeschwindigkeit [km/h]'
      : yAxis === 'Druck'
      ? 'Druck [hPa]'
      : yAxis === 'Luftfeuchtigkeit'
      ? 'Luftfeuchtigkeit [%]'
      : yAxis === 'UV Index'
      ? 'UV Index'
      : null;

  //Labes des zweiten Graphen für die Legende
  const graphLabel2 = yAxis === 'Temperatur' ? 'Außentemperatur [C]' : null;

  const lineConfig = { shape: 'spline', smoothing: 100 };

  const smoothArray = (arr, groupSize) => {
    const result = [];

    for (let i = 0; i < arr.length; i += groupSize) {
      const group = arr.slice(i, i + groupSize);
      const average =
        group.reduce((sum, value) => sum + value, 0) / group.length;
      result.push(average);
    }

    return result;
  };

  const plotLayout = {
    title: 'Wetterballon Daten',
    width: divWidth,
    height: 500,
    showlegend: true,
    xaxis: xAxisTitle,
    yaxis: yAxisTitle,
  };
  const plotData =
    yAxis === 'Temperatur'
      ? [
          {
            x: smoothArray(xAxisValue, smoothness),
            y: smoothArray(yAxisValue1, smoothness),
            type: 'scatter',
            mode: 'lines',
            line: lineConfig,
            name: graphLabel1,
          },
          {
            x: smoothArray(xAxisValue, smoothness),
            y: smoothArray(yAxisValue2, smoothness),
            type: 'scatter',
            mode: 'lines',
            line: lineConfig,
            name: graphLabel2,
          },
        ]
      : [
          {
            x: smoothArray(xAxisValue, smoothness),
            y: smoothArray(yAxisValue1, smoothness),
            type: 'scatter',
            mode: 'lines',
            line: lineConfig,
            name: graphLabel1,
          },
        ];

  console.log(csvData.Temperature_Board);
  //Beginn HTML
  return (
    <div>
      <div className='flex flex-col xl:flex-row justify-between xl:px-12'>
        <span className='block md:hidden'>
          Auf kleinen Geräten am besten im Querformat anschauen
        </span>
        {/* Beginn der Box für die Zusammenfassung links*/}
        <div className='bg-gray-100 rounded-2xl w-full xl:min-w-[390px] xl:max-w-[390px] min-h-[400px] max-h-[400px] justify-center text-center px-8 py-4 xl:mr-16'>
          <span className='text-2xl font-bold mb-4'>Zusammenfassung</span>
          <p>
            Minimale Innentemperatur: {summaryData.Min_Temperature_Board} [C]
          </p>
          <p>
            Maximale Innentemperatur: {summaryData.Max_Temperature_Board} [C]
          </p>
          <p>
            Minimale Außentemperatur: {summaryData.Min_Temperature_Ext_MS8607}{' '}
            [C]
          </p>
          <p className='mb-4'>
            Maximale Außentemperatur: {summaryData.Max_Temperature_Ext_MS8607}{' '}
            [C]
          </p>
          <p>
            Maximale Höhe (Meeresspiegel):{' '}
            {summaryData.Max_GNSS_Altitude_above_Mean_Sea_Level} [m]
          </p>
          <p className='mb-4'>
            Maximale Geschwindigkeit: {summaryData.Max_GNSS_Ground_speed} [km/h]
          </p>
          <p>Maximaler Druck: {summaryData.Max_Pressure_Ext_MS8607} [hPa]</p>
          <p className='mb-4'>
            Minimaler Druck: {summaryData.Min_Pressure_Ext_MS8607} [hPa]
          </p>
          <p>
            Maximale Luftfeuchtigkeit: {summaryData.Max_Humidity_Ext_MS8607} [%]
          </p>
          <p className='mb-4'>
            Minimale Luftfeuchtigkeit: {summaryData.Min_Humidity_Ext_MS8607} [%]
          </p>
        </div>
        {/* Ende der Box für die Zusammenfassung links*/}

        {/* Beginn der Box für die Graphen rechts*/}
        <div className='justify-start w-full' ref={divRef}>
          <Plot data={plotData} layout={plotLayout} />
          <div className='flex gap-12 px-4'>
            <Dropdown
              options={optionsX}
              selected={xAxis}
              sendDataToParent={setXAxis}
              title={'X-Achse'}
            />
            <Dropdown
              options={optionsY}
              selected={yAxis}
              sendDataToParent={setYAxis}
              title={'Y-Achse'}
            />
            <Dropdown
              options={optionsSmooth}
              selected={smoothness}
              sendDataToParent={setSmoothness}
              title={'Glättung'}
            />
          </div>
        </div>
        {/* Ende der Box für die Graphen rechts*/}
      </div>
      <div className='bg-gray-100 mt-20  justify-center xl:px-20 px-4 py-4'>
        <p className='text-2xl font-bold mb-4'>Fortgeschrittene Analyse</p>
        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4'>
          <div>
            <p>
              Minimale Innentemperatur: {summaryData.Min_Temperature_Board} [C]
            </p>
            <p>
              Maximale Innentemperatur: {summaryData.Max_Temperature_Board} [C]
            </p>
            <p>
              Durchschnittliche Innentemperatur:{' '}
              {summaryData.Avg_Temperature_Board} [C]
            </p>
            <p className='mb-12'>
              Standardabweichung Innentemperatur:{' '}
              {summaryData.SD_Temperature_Board} [C]
            </p>
          </div>
          <div>
            <p>
              Minimale Außentemperatur: {summaryData.Min_Temperature_Ext_MS8607}{' '}
              [C]
            </p>
            <p>
              Maximale Außentemperatur: {summaryData.Max_Temperature_Ext_MS8607}{' '}
              [C]
            </p>
            <p>
              Durchschnittliche Außentemperatur:{' '}
              {summaryData.Avg_Temperature_Ext_MS8607} [C]
            </p>
            <p className='mb-12'>
              Standardabweichung Außentemperatur:{' '}
              {summaryData.SD_Temperature_Ext_MS8607} [C]
            </p>
          </div>
          <div>
            <p>Maximaler Druck: {summaryData.Max_Pressure_Ext_MS8607} [hPa]</p>
            <p>Minimaler Druck: {summaryData.Min_Pressure_Ext_MS8607} [hPa]</p>
            <p>
              Durchschnittlicher Druck: {summaryData.Avg_Pressure_Ext_MS8607}{' '}
              [hPa]
            </p>
            <p className='mb-12'>
              Standardabweichung Druck: {summaryData.SD_Pressure_Ext_MS8607}{' '}
              [hPa]
            </p>
          </div>
          <div>
            <p>
              Maximale Luftfeuchtigkeit: {summaryData.Max_Humidity_Ext_MS8607}{' '}
              [%]
            </p>
            <p>
              Minimale Luftfeuchtigkeit: {summaryData.Min_Humidity_Ext_MS8607}{' '}
              [%]
            </p>
            <p>
              Durchschnittliche Luftfeuchtigkeit:{' '}
              {summaryData.Avg_Humidity_Ext_MS8607} [%]
            </p>
            <p className='mb-12'>
              Standardabweichung Luftfeuchtigkeit:{' '}
              {summaryData.SD_Humidity_Ext_MS8607} [%]
            </p>
          </div>
          <p>
            Maximale Höhe (Meeresspiegel):{' '}
            {summaryData.Max_GNSS_Altitude_above_Mean_Sea_Level} [m]
          </p>
          <p>
            Maximale Geschwindigkeit: {summaryData.Max_GNSS_Ground_speed} [km/h]
          </p>
          <p>Maximaler UV Index: {summaryData.Max_Light_Intensity_UVA_index}</p>
        </div>
      </div>
    </div>
  );
};

export default CsvPlotter;
