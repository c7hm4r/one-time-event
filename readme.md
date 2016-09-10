
# Gefahren

- Das ist nicht erlaubt:

    e = newOneTimeEvent();
    e.pub.addHandler(e.fire);
    e.fire();
