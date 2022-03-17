// ignore_for_file: must_be_immutable

import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:area/api/auth_email.dart';
import 'package:area/api/auth_google.dart';
import 'package:area/global/variables.dart' as global;

class CustomDrawer extends StatefulWidget {
  CustomDrawer({Key? key, required this.user}) : super(key: key);

  User user;

  @override
  _CustomDrawerState createState() => _CustomDrawerState();
}

class _CustomDrawerState extends State<CustomDrawer> {
  @override
  Widget build(BuildContext context) {
    return Drawer(
      child: ListView(
        padding: EdgeInsets.zero,
        children: <Widget>[
          SizedBox(
            height: 250,
            child: DrawerHeader(
              decoration: const BoxDecoration(
                shape: BoxShape.rectangle,
                gradient: LinearGradient(
                  colors: <Color>[
                    Color(0xFF0D47A1),
                    Color(0xFF1976D2),
                    Color(0xFF42A5F5),
                  ],
                ),
              ),
              curve: Curves.easeInCirc,
              child: Column(
                children: <Widget>[
                  ((() {
                    if (widget.user.photoURL != null) {
                      return CircleAvatar(
                        radius: 50,
                        backgroundImage: NetworkImage(widget.user.photoURL!),
                      );
                    } else {
                      return const CircleAvatar(
                        radius: 50,
                        backgroundImage: AssetImage('assets/profile.jpg'),
                      );
                    }
                  })()),
                  const SizedBox(
                    height: 15,
                  ),
                  ((() {
                    if (widget.user.email != null) {
                      return Text(
                        widget.user.email!,
                        style: const TextStyle(
                          fontSize: 20,
                          fontWeight: FontWeight.bold,
                        ),
                      );
                    } else {
                      return Text(
                        global.email,
                        style: const TextStyle(
                          fontSize: 20,
                          fontWeight: FontWeight.bold,
                        ),
                      );
                    }
                  })()),
                ],
              ),
            ),
          ),
          Column(
            mainAxisSize: MainAxisSize.max,
            children: <Widget>[
              ListTile(
                leading: const Icon(Icons.home),
                title: const Text('Home'),
                onTap: () {
                  Navigator.pushNamedAndRemoveUntil(
                      context, '/home', (_) => false);
                },
              ),
              ListTile(
                leading: const Icon(Icons.notifications),
                title: const Text('Notifications'),
                onTap: () {
                  Navigator.pushNamed(context, '/notifications');
                },
              ),
              ListTile(
                leading: const Icon(Icons.sync),
                title: const Text('Actions & Reactions'),
                onTap: () {
                  Navigator.pushNamed(context, '/actionsreactions');
                },
              ),
              ListTile(
                leading: const Icon(Icons.settings),
                title: const Text('Settings'),
                onTap: () {
                  Navigator.pushNamed(context, '/settings');
                },
              ),
              const Divider(
                height: 10,
                thickness: 1,
              ),
              ListTile(
                leading: const Icon(Icons.exit_to_app),
                title: const Text('Logout'),
                onTap: () {
                  final provider =
                      Provider.of<GoogleLoginProvider>(context, listen: false);
                  provider.googleLogout();
                  EmailLoginProvider().signOut();
                },
              ),
            ],
          ),
        ],
      ),
    );
  }
}
