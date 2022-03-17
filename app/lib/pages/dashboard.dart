import 'package:flutter/material.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:area/components/drawer.dart';
import 'package:area/components/widget.dart';
import 'package:flutter/services.dart';
import 'package:dio/dio.dart';
import 'package:flutter/foundation.dart';
import 'package:area/global/variables.dart' as global;

class Dashboard extends StatefulWidget {
  const Dashboard({Key? key}) : super(key: key);

  @override
  _DashboardState createState() => _DashboardState();
}

class _DashboardState extends State<Dashboard> {
  final User user = FirebaseAuth.instance.currentUser!;
  dynamic notif;

  fetchNotifications() async {
    try {
      Dio dio = Dio();
      notif = await dio.get(global.url + '/api/user/' + global.email);
      if (kDebugMode) {
        print("Notifications: " + notif.data.toString());
      }
      return notif.data;
    } catch (e) {
      if (kDebugMode) {
        print(e);
        rethrow;
      }
    }
  }

  Widget displayNotificationNumber() {
    return (Stack(children: [
      IconButton(
        onPressed: () {
          Navigator.pushNamed(context, '/notifications');
        },
        icon: const Icon(Icons.notifications),
      ),
      Positioned(
        right: 3,
        child: ClipOval(
          child: FutureBuilder(
              future: fetchNotifications(),
              builder: (BuildContext context, AsyncSnapshot<dynamic> snapshot) {
                if (snapshot.hasData &&
                    snapshot.data != null &&
                    snapshot.data['notifications'].length > 0) {
                  return Container(
                    height: 20,
                    width: 20,
                    color: Colors.red,
                    child: Center(
                      child: Text(
                        snapshot.data['notifications'].length.toString(),
                        style: const TextStyle(fontWeight: FontWeight.bold),
                      ),
                    ),
                  );
                } else {
                  return Container();
                }
              }),
        ),
      ),
    ]));
  }

  @override
  Widget build(BuildContext context) {
    global.email = user.email!;
    return Scaffold(
      appBar: AppBar(
        title: const Text('AREA'),
        centerTitle: true,
        shape: const RoundedRectangleBorder(
          borderRadius: BorderRadius.vertical(
            bottom: Radius.circular(30),
          ),
        ),
        flexibleSpace: Container(
          decoration: const BoxDecoration(
            borderRadius: BorderRadius.only(
              bottomLeft: Radius.circular(20),
              bottomRight: Radius.circular(20),
            ),
            gradient: LinearGradient(
              colors: [Color.fromARGB(255, 240, 34, 19), Colors.blue],
              begin: Alignment.topLeft,
              end: Alignment.bottomRight,
            ),
          ),
        ),
        systemOverlayStyle: const SystemUiOverlayStyle(
          statusBarColor: Colors.transparent,
          statusBarIconBrightness: Brightness.light,
          statusBarBrightness: Brightness.dark,
        ),
        backgroundColor: Colors.transparent,
        shadowColor: Colors.transparent,
        actions: <Widget>[
          displayNotificationNumber(),
        ],
      ),
      drawer: CustomDrawer(
        user: user,
      ),
      body: Column(children: const <Widget>[
        // if (global.githubState == true)
        Widgets(),
      ]),
      floatingActionButton: FloatingActionButton(
        child: const Icon(Icons.add),
        onPressed: () {
          Navigator.pushNamedAndRemoveUntil(
              context, '/apipage', (route) => false);
        },
      ),
    );
  }
}
