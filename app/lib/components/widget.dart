import 'package:dio/dio.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:area/components/detail.dart';
import 'package:area/global/variables.dart' as global;

class Widgets extends StatefulWidget {
  const Widgets({Key? key}) : super(key: key);

  @override
  State<Widgets> createState() => _WidgetsState();
}

class _WidgetsState extends State<Widgets> {
  dynamic user;

  dynamic getData() async {
    try {
      dynamic response =
          await Dio().get(global.url + '/api/user/' + global.email);
      if (response.statusCode == 200) {
        user = response.data;
        if (kDebugMode) {
          print("=== User Data ===");
          print(global.userData);
          print("=== User ===");
          print(user);
          global.userData = response.data;
          global.weatherState = response.data['subscriptions'][0]['state'];
          global.unsplashState = response.data['subscriptions'][1]['state'];
          global.githubState = response.data['subscriptions'][2]['state'];
          global.animeState = response.data['subscriptions'][3]['state'];
          global.twitterState = response.data['subscriptions'][4]['state'];
          global.cryptoState = response.data['subscriptions'][5]['state'];
          global.covidState = response.data['subscriptions'][6]['state'];
          global.esportState = response.data['subscriptions'][7]['state'];
          global.footballState = response.data['subscriptions'][7]['state'];
        }
        return response.data;
      } else {
        throw Exception('Failed to load data');
      }
    } catch (e) {
      if (kDebugMode) {
        print(e);
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return FutureBuilder(
      future: getData(),
      builder: (BuildContext context, AsyncSnapshot<dynamic> snapshot) {
        if (snapshot.hasData) {
          return Expanded(
            child: SizedBox(
              height: 200,
              child: ListView.builder(
                itemCount: snapshot.data['subscriptions'].length,
                itemBuilder: (BuildContext context, int index) {
                  if (snapshot.data['subscriptions'][index]['state'] == true) {
                    return Card(
                      shape: const RoundedRectangleBorder(
                        borderRadius: BorderRadius.all(Radius.circular(15.0)),
                      ),
                      child: ListTile(
                        title:
                            Text(snapshot.data['subscriptions'][index]['name']),
                        onTap: () {
                          // DetailWidget(
                          //   widgetData: snapshot.data['subscriptions'][index],
                          // );
                          Navigator.push(
                            context,
                            MaterialPageRoute(
                              builder: (context) => DetailWidget(
                                widgetData: snapshot.data['subscriptions']
                                    [index],
                                userData: user,
                                serviceName: snapshot.data['subscriptions']
                                    [index]['name'],
                              ),
                            ),
                          );
                        },
                      ),
                    );
                  } else {
                    return Container();
                  }
                },
              ),
            ),
          );
        } else {
          return const Center(
            child: CircularProgressIndicator(),
          );
        }
      },
    );
  }
}
