package com.fullerbloom.unify;


import android.os.Bundle;
//allows cookie setting
// import android.webkit.CookieManager;
import org.apache.cordova.DroidGap;
//required for cleaning out appData each time app starts.
import java.io.File;
import android.util.Log;

public class Unify extends DroidGap {
    /** Called when the activity is first created. */	
	
	
    //remove this line in production
//	private static Unify instance;
	
	//keep
    @Override
    public void onCreate(Bundle savedInstanceState) {
    	 
         //remove these lines in production
//		instance = this;
//        Unify.getInstance().clearApplicationData();
        
    	//allows cookie setting
    	// CookieManager.setAcceptFileSchemeCookies(true);
    	//keep        
    	super.onCreate(savedInstanceState);
        super.loadUrl("file:///android_asset/www/index.html");
    }
	

    
//remove to end in production
//	public static Unify getInstance() {
//		return instance;
//	}
//
//	public void clearApplicationData() {
//		File cache = getCacheDir();
//		File appDir = new File(cache.getParent());
//		if (appDir.exists()) {
//			String[] children = appDir.list();
//			for (String s : children) {
//				if (!s.equals("lib")) {
//					deleteDir(new File(appDir, s));
//					Log.i("TAG", "**************** File /data/data/APP_PACKAGE/" + s + " DELETED *******************");
//				}
//			}
//		}
//	}
//
//	public static boolean deleteDir(File dir) {
//		if (dir != null && dir.isDirectory()) {
//			String[] children = dir.list();
//			for (int i = 0; i < children.length; i++) {
//				boolean success = deleteDir(new File(dir, children[i]));
//				if (!success) {
//					return false;
//				}
//			}
//		}
//
//		return dir.delete();
//	}
	
}