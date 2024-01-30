import csv

with open('generated.csv', 'w', newline='') as file:
    writer = csv.writer(file, delimiter=";")
    field = ["name", "age", "country"]
    
    writer.writerow(field)
    writer.writerow(["Oladele Damilola", "40", "Nigeria"])
    writer.writerow(["Alina Hricko", "23", "Ukraine"])
    writer.writerow(["Isabel Walter", "50", "United Kingdom"])