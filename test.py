import pandas as pd
import matplotlib.pyplot as plt

bb_data = pd.read_csv('1_csv_data.csv', delimiter=';', skiprows=6)
plt.plot(bb_data['Uptime [s]'], bb_data['Temperature: Board [degC]'], label = "Temperature")
plt.title("Auswertung der Daten des Loggers")
plt.xlabel("Zeit")
plt.ylabel("Millions of USD ($)")
plt.legend() 
plt.show()


"""
bb_data = pd.read_csv('test3.csv', delimiter=';')
plt.plot(bb_data['Uptime [s]'], bb_data['GNSS: PPS Timestamp [s]'], label = "Temperature")
plt.title("Auswertung der Daten des Loggers")
plt.xlabel("Zeit")
plt.ylabel("Millions of USD ($)")
plt.legend() 
plt.show()



bb_data2 = pd.read_csv('test3.csv', delimiter=';')
print(bb_data2.columns)

plt.rcParams["figure.figsize"] = [7.50, 3.50]
plt.rcParams["figure.autolayout"] = True

headers = ['Name', 'Age', 'Marks']


df.set_index('Name').plot()

plt.show()
"""