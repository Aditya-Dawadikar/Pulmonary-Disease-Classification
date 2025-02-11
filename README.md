# **Pulmonary Disease Classification from Lung Auscultation Audio**

## **Overview**
This repository contains a deep learning-based solution for classifying pulmonary diseases using lung auscultation audio. The project leverages **Convolutional Neural Networks (CNNs)** and **Recurrent Neural Networks (RNNs)** to extract spatial and temporal features from lung sounds to detect respiratory anomalies.

## **Motivation**
Lung auscultation is a vital diagnostic method used by physicians to assess airflow through the lungs. However, manual assessment is subjective and requires extensive experience. This project aims to automate pulmonary disease classification using AI, enabling **early detection and diagnosis** of respiratory conditions.

## **Dataset**
- [ICBHI Dataset](https://anvilproject.org/guides/content/creating-links)
- [ICBHI Dataset - Kaggle](https://www.kaggle.com/datasets/vbookshelf/respiratory-sound-database)
- [Mendeley Respiratory Dataset](https://data.mendeley.com/datasets/fr7zvy8j5s/1)
- [Medzschool Lung and Breath Sounds | Youtube Playlist](https://www.youtube.com/playlist?list=PL3n8cHP87ijAalXtLG2YbDpuwjxuJRR-A)

### ICBHI 2017 Respiratory Sound Dataset
The ICBHI 2017 Challenge Dataset is a publicly available respiratory sound database designed for the development and benchmarking of automated pulmonary disease classification systems. It contains lung auscultation recordings collected from multiple subjects with various respiratory conditions. The dataset is one of the most comprehensive collections of annotated lung sounds available for machine learning applications.

#### Dataset Composition
Total Samples: 920 lung sound recordings
Total Duration: 5.5 hours of annotated respiratory audio
Subjects: 126 patients
Sampling Frequency: 4 kHz
Audio Format: WAV files (16-bit PCM)
Acquisition Locations: Various chest regions (anterior, posterior, lateral)
Annotation Type: Expert-labeled respiratory cycles, specifying the presence of wheezes and crackles

#### Data Classes
The dataset provides two levels of classification:

##### Anomaly-Based Labels:
Healthy
Crackle
Wheeze
Crackle + Wheeze

##### Pathology-Based Labels:
Healthy
Chronic Obstructive Pulmonary Disease (COPD)
Pneumonia
Bronchiectasis
Upper Respiratory Tract Infection (URTI)
Lower Respiratory Tract Infection (LRTI)
Asthma

## **Challenges in Pulmonary Disease Classification**
- **Dataset Quality**: Lung sounds are often noisy, with background interference.
- **Class Imbalance**: Limited data availability for certain conditions.
- **Varied Audio Lengths**: Different recordings have different durations, requiring effective feature extraction techniques.

## **Proposed Solution**
### **Step 1: Data Augmentation**
- Used **SMOTE (Synthetic Minority Over-sampling Technique)** to balance classes.
- Random sampling for **COPD** cases to reduce class imbalance.
- Ensured **80%-20% split** (validation set only includes original samples).

### **Step 2: Data Preprocessing**
- **Wavelet Transform-Based Digital Filters** for noise reduction and high **Signal-to-Noise Ratio (SNR)**.
- Applied **Bandpass Filtering (100-1000 Hz)** to remove heartbeats and stomach murmurs.

### **Step 3: Feature Extraction**
- **Mel Frequency Cepstral Coefficients (MFCC) Spectrograms**.
- **Chromagram for pitch representation**.

### **Step 4: Audio Classification**
- **CNN Model** for extracting **spatial features**.
- **RNN (LSTM)** for recognizing **temporal features**.
- Final **Dense Layer** for classification.

## **Data Classes**
- **Anomaly-Based**: Healthy, Crackle, Wheeze.
- **Pathology-Based**: Asthma, Pneumonia, LRTI (Lower Respiratory Tract Infection), URTI (Upper Respiratory Tract Infection), COPD.

## **Existing Research Considerations**
- **MFCC-based spectrogram generation** for time-frequency representation.
- **Digital bandpass filters** for audio signal denoising.
- **CNN-based deep learning models** for spectrogram analysis.

## **Sample Anomalies Detected**
- [Fine Crackles](https://youtu.be/LHqqvrm2j6g?feature=shared)
- [Coarse Crackles](https://youtu.be/aSor2XBc9K8?feature=shared)
- [Rhonchi](https://youtu.be/YgDiMpCZo0w?feature=shared)
- [Wheezing](https://youtu.be/T4qNgi4Vrvo?feature=shared)
- [Normal Breathing Sound](https://youtu.be/VtnMRG0ORLs?feature=shared)

## Resources

#### Presentation:
- [Engineering Final Project Presentation](https://docs.google.com/presentation/d/15R2Iyz_M9i4dbqN_sUWLinD1h3o7cjtXT-Gp99novzo/edit?usp=sharing)
- [I2CT Conference Presentation](https://docs.google.com/presentation/d/1-KFvnOl_XnS4Zpr9hkuNm3tvvOkU7XIp/edit?usp=sharing&ouid=117691464471384648220&rtpof=true&sd=true)
#### Demo Video:
Click on the Image or the Link below for demo
[Demo Link](https://drive.google.com/file/d/1fIFL_JiWWNA0UfrlYhAA_KIp5FDaeK3-/view?usp=drive_link)
[![Application View](https://github.com/Aditya-Dawadikar/Pulmonary-Disease-Classification/blob/main/Pulmonary%20Disease%20Classification%20App%20demo.png)](https://drive.google.com/file/d/1fIFL_JiWWNA0UfrlYhAA_KIp5FDaeK3-/view?usp=drive_link)
#### Publications:
- [Three Feature Based Ensemble Deep Learning Model for Pulmonary Disease Classification](https://d1wqtxts1xzle7.cloudfront.net/99695152/IRJET_V10I2102-libre.pdf?1678512429=&response-content-disposition=inline%3B+filename%3DThree_Feature_Based_Ensemble_Deep_Learni.pdf&Expires=1739318525&Signature=UoGpWP6CeD3tnRXG4W8H9VTOI0h9VBzU94hrYGtMa~DLzovgQ2C0Nh-vzkENK4nt8-Sbic39dzCw540AWSi0AiVKByvJW4TNeJFwwFRzFxscd8CARTRO-M31afoypt7E32xuCbukDSM3x3LeEKEBedRy0TfY4iJvk9aRo4E9ZI4h1S8AdVXJfuLqsA~ZqtjRHiHwXAMjMsxVwi2onhKx9eztZFoH0x48eW0U17ZYIMcwFnkY4~HC8p8f5PZxnWo2Nuj71pLCQCI1mRInahvTjGbFBxIghGEJbgD5GGmqd-1MpqUO0tfHaAc6Mn7qRRAoNSnv9SCmX3MRhX-0IUxRwQ__&Key-Pair-Id=APKAJLOHF5GGSLRBV4ZA)
- [Survey of Techniques for Pulmonary Disease Classification using Deep Learning](https://ieeexplore.ieee.org/abstract/document/9824879)

#### References

[1] D. Perna and A. Tagarelli, "Deep auscultation: Predicting respiratory anomalies and diseases via recurrent neural networks," *2019 IEEE 32nd International Symposium on Computer-Based Medical Systems (CBMS)*, 2019, pp. 50-55. [DOI: 10.1109/CBMS.2019.00017](https://ieeexplore.ieee.org/abstract/document/8621273)

[2] A. I. Rocha, B. M. Rocha, and H. Silveira, "A respiratory sound database for the development of automated classification," *2019 IEEE International Conference on Bioinformatics and Biomedicine (BIBM)*, 2019, pp. 1806-1810. [DOI: 10.1109/BIBM47256.2019.8983182](https://ieeexplore.ieee.org/abstract/document/8787435)

[3] B. M. Rocha et al., "A Respiratory Sound Database for the Development of Automated Classification," in *Precision Medicine Powered by pHealth and Connected Health: ICBHI 2017, Thessaloniki, Greece, 18-21 November 2017*, Springer, 2018, pp. 33-37. [DOI: 10.1007/978-981-10-7419-6_6](https://link.springer.com/chapter/10.1007/978-981-10-7419-6_6)

## Acknowledgements

This project was developed as part of the **Computer Engineering Graduation Project** at **[Pimpri Chinchwad College of Engineering (PCCOE)](https://computer.pccoepune.com/)** under the guidance of **Professor Atul Pawar**.

We would like to express our gratitude to **Professor Atul Pawar** [LinkedIn](https://www.linkedin.com/in/atul-gulabrao-pawar-16a9ba349/) for his invaluable guidance and support throughout the project.

This project was a collaborative effort with my amazing teammates:
- **Anshu Shrivastava** [LinkedIn](https://www.linkedin.com/in/anshu-srivastava0613/)
- **Neha Shelar** [LinkedIn](https://www.linkedin.com/in/neha-shelar/)
- **Gaurav Gaikwad** [LinkedIn](https://www.linkedin.com/in/gauravgaikwad1/)

Their dedication and contributions were instrumental in the successful completion of this work.
