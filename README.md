# Project-3

This project utilzes Scikit-Learn paired with MatPlotLib and Pandas to try and determine which, if any, factors are key contributors in the annual quality of the Fort Collins water. By using Scikit-Learn, the data was able to be fitted into models and those models were then used to predict the data. As well as to determine if the predicted data is decent by using Mean Squared Errors (mse) and r^2. The measured values that were used were: pH, turbidity (NTU), and temperature (C). Sourced data is available here: <a href = "https://opendata.fcgov.com/Environmental-Health/City-of-Fort-Collins-Water-Quality/8n27-taq6">Water Data Source</a>.

# Initial Plot

The csv file was read using pd.read_csv and turned into a cleaned dataframe. The columns containing the data for pH, turbidity, and temperature were assigned X and y values so the data can be plotted. Below is one of a few initial plots. For comparison, the data was plotted as such: "Poudre Water and Finished Water" vs "Horsetooth Water and Finished Water" to see if there was a noticeable difference of the source water's effect on the finished water product. Even though the water plant uses two different water sources, the data was consistent at this point.

<img src = "images/temperature.png">

# Using Scikit-Learn

Using mse and r^2 helped determine how well the models predicted the data with linear regression. The mse is the margin of error and the r^2 is the accuracy of the data, so the closer the values for the mse and r^2 are to 0, the better the model prediction is. Based on the two values calculated, the chart below is the one that has both the mse and r^2 values closer than the other two measurements that were analyzed. This is because the value of the mse is the one at or closer to 0 the most than the others. Which means the difference between the error of the actual value and the estimated value was the lowest calculated value. For reference, the turbidity charts had a mse of 0, and that makes the charts match the data because the test data could essentially be part of the data if someone saw the chart at first glance. The next chart with a comparable mse is the pH chart and this is because the data for pH has a range between 6.5 and 8.0; that doesn't give a big range of variety in data.

<img src = "images/PF_turb_residual.png">
   
<img src = "images/HF_pH_residual.png">

<img src = "images/HF_temp_residual.png">

# Conclusion

Initially, it was believed that turbidity was the sole key factor in regards to having good water quality since the turbidity is the measurement of the water's clarity. But, based on the prediction of the data, the pH plays a big role as well and has trended to be consistent as there isn't much room for the data to vary. Also, if the pH is too basic (7<) or too acidic (>7) then the pipes could be affected and in turn would cause a big difference in the water's turbidity. The temperature also affects the water too. That makes sense because when the weather is cold, the water is stagnant, which means there is less debris to go into the water and affect the turbidity. When the weather increases, the icy waters melt, causing runoff and in turn bringing debris. Plus, it is nice to have cold water running out of the faucet.
